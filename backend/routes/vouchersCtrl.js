 // Importations
const db = require('../dbConnect');
const jwtUtils = require('../utils/jwt.utils');

var pool = db.getPool()
 
module.exports = {
    /**
     * Renvoie le taux de change utilisé pour la conversion EURO - GNF
     * @param {*} req 
     * @param {*} res 
     */
    getExchangeRate: (req, res) => {
        return res.status(200).json({
            'exchange_rate': 12000
        });
    },
    /**
     * Renvoie l'ensemble des points de retraits
     */
    getWithdrawalPlaces: (req, res) => {
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            const query = 'SELECT * FROM withdrawal;'
            connection.query(query, (err, result) => {
                if (err) return res.status(500).json({ 'error': 'unable to get withdrawal places' })
                res.status(200).json({ 
                    'withdrawals' : result
                })
            })
            connection.release();
        })
    },
    /**
     * Créé une nouvelle transaction dans la BD
     * @param {*} req 
     * @param {*} res 
     */
    createTransaction: (req, res) => {
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        const today = new Date()
        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const day = today.getDate()

        const withdrawalId = req.body.withdrawal_id
        const numberOfVouchers = req.body.number_of_vouchers
        const exchangeRate = req.body.exchange_rate
        const amountGnf = req.body.amount_gnf
        const shipping = req.body.shipping
        const totalAmount = req.body.total_amount
        const recipientId = req.body.recipient_selected
        const transactionReference = req.body.transaction_reference

        if (userId < 0) return res.status(400).json({ 'error': 'wrong token' });
        const insertQuery = "INSERT INTO transaction VALUES (\"" + transactionReference + "\", \"" + year + "-" + month + "-" + day + "\");"

        const scdInsertQuery = "INSERT INTO transaction_details VALUES (" + userId + ", " + recipientId + ", \"" + transactionReference + "\", " +
                               withdrawalId + ", " + numberOfVouchers + ", " + shipping + ", " + totalAmount + ", " + amountGnf + ", " + exchangeRate + ");"

        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.beginTransaction(function(err) {
                if (err) return res.status(500).json({ message: 'unable to validate user, transaction failed' });
                connection.query(insertQuery, (err, result) => {
                    if (err) { 
                        connection.rollback(function() {
                            return res.status(500).json({ message: 'unable to insert transaction in database' });
                        });
                    }
                    connection.query(scdInsertQuery, (err, result) => {
                        if (err) {
                            connection.rollback(function() {
                                return res.status(500).json({ message: 'unable to insert transaction details' });
                            });
                        }
                        connection.commit(function(err) {
                            if (err) { 
                                connection.rollback(function() {
                                    return res.status(500).json({ message: 'unable to commit change' });
                                });
                            }
                        });
                    });
                });
            });
            connection.release();
            return res.status(201).json({
                'transaction_reference': transactionReference
            });
        })
    },
    getTransactionReceipt: (req, res) => {
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);
        
        console.log('user id : ', userId)
        
        if (userId < 0) return res.status(400).json({ message: 'wrong token' });
        
        const transactionReference = req.params.reference
        console.log('params : ', transactionReference)

        const selectQuery = "SELECT transaction_date, transaction_reference, R.name as recipient_name, R.phone_number as recipient_phone_number, number_of_vouchers, " + 
                            "amount_gnf, shipping, total_amount, W.name as withdrawal_name, manager as withdrawal_manager, W.phone_number as withdrawal_phone_number, " + 
                            "W.email as withdrawal_email, U.first_name as user_first_name, U.last_name as user_last_name, U.phone_number as user_phone_number, " + 
                            "U.email as user_email FROM transaction, transaction_details as TD, recipient as R, withdrawal as W, user as U WHERE " + 
                            "transaction_reference = reference AND TD.user_id = R.user_id AND TD.recipient_id = R.recipient_id AND TD.withdrawal_id = W.withdrawal_id " + 
                            "AND TD.user_id = U.user_id AND TD.user_id = " + userId + " AND transaction_reference = \"" + transactionReference + "\";"
        
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(selectQuery, (err, result) => {
                if (err) res.status(500).json({ message: 'cannot fetch user transaction' });
                return res.status(200).json(result)
            })
            connection.release();
        })
    }
}
