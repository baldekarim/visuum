// Importations
const db = require('../dbConnect');
const bcrypt   = require('bcrypt');
const crypto   = require('crypto');
const jwtUtils = require('../utils/jwt.utils');
const mail     = require('../utils/mail')

const EMAIL_REGEX    = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$/;

var pool = db.getPool()

module.exports = {
    register: function(req, res) {
        var lastName = req.body.last_name
        var firstName = req.body.first_name
        var address = req.body.address
        var city = req.body.city
        var zipCode = req.body.zipcode
        var country = req.body.country
        var phoneNumber = req.body.phone_number
        var email = req.body.email
        var password = req.body.password
        var confirmPassword = req.body.confirm_password

        if (email == null || password == null) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ message: 'email is not valid' });
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ message: 'password invalid' });
        }

        if (password != confirmPassword) {
            return res.status(400).json({ message: 'password and confirmation do not match' });
        }

        var nbResultCountInActiveUsers;
        var nbResultCountInNonActiveUsers;
        var selectQuery = "SELECT COUNT(*) as emailsFoundCount FROM user WHERE email=\"" + email + "\" " +
                            "UNION SELECT COUNT(*) as emailsFoundCount FROM user_to_be WHERE email=\"" + email + "\";"

        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectQuery, function (error, results) {
                if (results.length == 2) {
                    nbResultCountInActiveUsers = results[0].emailsFoundCount
                    nbResultCountInNonActiveUsers = results[1].emailsFoundCount
                    if (nbResultCountInActiveUsers == 1) {
                        return res.status(409).json({ message: 'user already exist' });
                    } else if (nbResultCountInNonActiveUsers == 1) {
                        return res.status(409).json({ message: 'user exist but not yet active' });
                    }
                } else {
                    bcrypt.hash(password, 10, (err, bcryptedPassword) => {
                        if (err) return res.status(500).json({ message: 'cannot add user' });
                        const keyUser = crypto.randomBytes(20).toString('hex');
                        var insertRequest = "INSERT INTO `user_to_be` VALUES (\"" + keyUser + "\", \"" + lastName + "\", \"" + firstName + "\", \"" +
                                            address + "\", \"" + city + "\", " + zipCode + ", \"" + country + "\", \"" + phoneNumber + "\", \"" +
                                            email + "\", \"" + bcryptedPassword + "\");" 
    
                        connection.query(insertRequest, (err, result) => {
                            if (err) return res.status(500).json({ message: 'cannot add user' });
                        })
                    
                        const recipient = "abdkarim.balde@gmail.com"  // email
                        const mSubject = "Votre compte Visuum – Validation de votre adresse email ✔"
                        mailContent = "<p>Merci de vous être inscrit à <b>Visuum</b>.<br/><br/>Pour finaliser la création de votre compte, " + 
                                      "validez votre adresse email en cliquant sur le lien ci-dessous.<br/><br/>" + 
                                      "http://localhost:4200/validation-utilisateur?key=" + keyUser + "</p>"
                        
                        mail.sendMail(recipient, mSubject, mailContent)
                        return res.status(201).json({
                            'key_user': keyUser
                        });
                    })
                }
                connection.release();
                if (error) return res.status(500).json({ message: 'unable to verify user' });
            }); 
        });
    },
    validateRegistering: function(req, res) {
        let keyUser = req.query.key

        let selectQuery = "SELECT * FROM user_to_be WHERE key_user = \"" + keyUser + "\";"
        let insertQuery = "INSERT INTO user (last_name, first_name, address, city, zip_code, country, phone_number, email, password, is_admin) " + 
                          "SELECT last_name, first_name, address, city, zip_code, country, phone_number, email, password, 0 as is_admin FROM user_to_be " +
                          "WHERE key_user = \"" + keyUser + "\";"
        let deleteQuery = "DELETE FROM user_to_be WHERE key_user=\"" + keyUser + "\";"

        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(selectQuery, function (error, results) {
                if (error) return res.status(500).json({ message: 'unable to validate user' });
                if (results.length == 0) {
                    return res.status(208).json({ message: 'user already validated' })
                } else if (results.length == 1) {
                    connection.beginTransaction(function(err) {
                        if (err) return res.status(500).json({ message: 'unable to validate user, transaction failed' });
                        connection.query(insertQuery, function(err, result) {
                            if (err) { 
                                connection.rollback(function() {
                                    return res.status(500).json({ message: 'unable to insert user in database' });
                                });
                            }
                            connection.query(deleteQuery, function(err, result) {
                                if (err) {
                                    connection.rollback(function() {
                                        return res.status(500).json({ message: 'unable to delete temporary user' });
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
                        'key_user': keyUser
                    });
                } else {
                    connection.release();
                    return res.status(500).json({ message: "the same key is used by multiple users" })
                }
            });
        });
    },
    login: function(req, res) {
        const email = req.body.email
        const password = req.body.password   

        if (!email) return res.status(400).json({ message: 'missing parameter', info: 'email'})
        if (!password) return res.status(400).json({ message: 'missing parameter', info: 'password'})

        var selectQuery = "SELECT * FROM user WHERE email=\"" + email + "\";"
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectQuery, (err, result) => {
                if (err) return res.status(500).json({ message: 'unable to verify user' })
                if (result.length == 1) {
                    const userFound = result[0]
                    bcrypt.compare(password, userFound.password, (errBycrypt, resBycrypt) => {
                        if (resBycrypt) {
                            return res.status(200).json({ 
                                'userId': userFound.user_id,
                                'token' : jwtUtils.generateTokenForUser(userFound)
                            })
                        } else {
                            return res.status(403).json({ message: 'invalid password' })
                        }
                    })
                } else return res.status(404).json({ message: 'user not exist in DB' })
                connection.release();
            })
        })
    },
    getUserProfile: function(req, res) {
        // Getting auth header
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);
    
        if (userId < 0) return res.status(400).json({ message: 'wrong token' });
        
        var selectQuery = "SELECT user_id, last_name, first_name, address, city, zip_code, country, phone_number " +
                          "FROM user WHERE user_id=" + userId + ";"

        const userTransactionQuery = "SELECT transaction_date, transaction_reference, number_of_vouchers, name, phone_number FROM transaction, " + 
                                     "transaction_details as TD, recipient as R WHERE transaction_reference = reference AND TD.user_id = R.user_id AND " + 
                                     "TD.recipient_id = R.recipient_id AND TD.user_id = " + userId + ";"
        
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectQuery, (err, result) => {
                if (err) res.status(500).json({ message: 'cannot fetch user' });
                if (result.length == 1) {
                    const userInfo = result[0]
                    connection.query(userTransactionQuery, (err, trResults) => {
                        if (err) res.status(500).json({ message: 'cannot get user transactions' });
                        const jsonObj = {
                            "last_name": userInfo.last_name,
                            "first_name": userInfo.first_name,
                            "address": userInfo.address,
                            "city": userInfo.city,
                            "zip_code": userInfo.zip_code,
                            "country": userInfo.country,
                            "phone_number": userInfo.phone_number,
                            "transactions": trResults
                        }
                        return res.status(200).json(jsonObj)
                    })
                }
                else return res.status(404).json({ message: 'user not found' });
            })
            connection.release();
        })
    },
    updateAddress: function(req, res) {
        // Getting auth header
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        if (userId < 0) return res.status(400).json({ message: 'wrong token' });

        const country = req.body.country
        const address = req.body.address
        const zipCode = req.body.zip_code
        const city = req.body.city
        const phoneNumber = req.body.phone_number

        console.log('country : ', country)
        console.log('adresse : ', address)
        console.log('zipcode : ', zipCode)
        console.log('city : ', city)
        console.log('phone number : ', phoneNumber)

        console.log('request body update address : ', req.body)

        if (country == null && address == null && zipCode == null && city == null && phoneNumber == null) {
            return res.status(400).json({ message: 'missing parameters' });
        }

        var setClause = []
        if (country) {
            setClause.push("country = \"" + country + "\"")
        }
        if (address) {
            setClause.push("address = \"" + address + "\"")
        }
        if (zipCode) {
            setClause.push("zip_code = " + zipCode)
        }
        if (city) {
            setClause.push("city = \"" + city + "\"")
        }
        if (phoneNumber) {
            setClause.push("phone_number = \"" + phoneNumber + "\"")
        }

        const selectQuery = "SELECT * FROM user WHERE user_id = " + userId + ";"
        const updateQuery = "UPDATE user SET " + setClause.join(', ') + " WHERE user_id = " + userId + ";"

        console.log('update query : ', updateQuery)

        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectQuery, (err, result) => {
                if (err) return res.status(500).json({ message: 'unable to verify user' });
                if (result.length == 1) {
                    connection.query(updateQuery, (err) => {
                        if (err) return res.status(500).json({ message: 'cannot update user profile' });
                        return res.status(201).json({
                            'userId': userId
                        })
                    })
                } else return res.status(404).json({ message: 'user not found' });
            })
            connection.release();
        })
    },
    updatePassword: function(req, res) {
        // Getting auth header
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        if (userId < 0) return res.status(400).json({ message: 'wrong token' });
 
        // Params
        const oldPassword = req.body.old_password
        const newPassword = req.body.new_password
        const newPasswordConfirm = req.body.new_password_confirm
        if (!oldPassword || !newPassword || !newPasswordConfirm) return res.status(400).json({ message: 'missing parameters' });

        const selectQuery = "SELECT * FROM user WHERE user_id = " + userId + ";"
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectQuery, (err, result) => {
                if (err) return res.status(500).json({ message: 'unable to verify user' })
                if (result.length == 1) {
                    const userFound = result[0]
                    bcrypt.compare(oldPassword, userFound.password, (errBycrypt, resBycrypt) => {
                        if (resBycrypt) {
                            if (!PASSWORD_REGEX.test(newPassword)) {
                                return res.status(400).json({ message: 'password invalid (must length at least 8 and include letter and number at least)' });
                            }
                            if (newPassword != newPasswordConfirm) {
                                return res.status(400).json({ message: 'password and confirmation do not match' });
                            }
    
                            bcrypt.hash(newPassword, 10, (err, bcryptedPassword) => {
                                if (err) return res.status(500).json({ message: 'cannot update user password' });
                                const updateQuery = "UPDATE user SET password = \"" + bcryptedPassword + "\" WHERE user_id = " + userId + ";"
                                connection.query(updateQuery, (err) => {
                                    if (err) return res.status(500).json({ message: 'cannot update user password update failed' });
                                    return res.status(201).json({
                                        'userId': userId
                                    })
                                })
                            })
                        } else {
                            return res.status(403).json({ message: 'invalid password' })
                        }
                    })
                } else return res.status(404).json({ message: 'user not exist in DB' })
            })
            connection.release();
        })
    },
    getRecipient: (req, res) => {
        // Getting auth header
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        if (userId < 0) return res.status(400).json({ message: 'wrong token' });
        const selectQuery = "SELECT recipient_id, name, phone_number FROM recipient WHERE user_id = " + userId + ";"
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectQuery, (err, result) => {
                if (err) res.status(500).json({ message: 'cannot fetch user' });
                if (result.length == 0) return res.status(404).json({ message: 'no recipient found' });
                else return res.status(200).json({
                    recipients: result
                });
            })
            connection.release();
        })
    },
    addRecipient: (req, res) => {
        // Getting auth header
        var headerAuth  = req.headers['authorization'];
        var userId      = jwtUtils.getUserId(headerAuth);

        const fullName = req.body.name
        const phoneNumber = req.body.phone_number

        console.log('fullname : ', fullName)
        console.log('phone number : ', phoneNumber)

        console.log('request body add recipient : ', req.body)

        if (userId < 0) return res.status(400).json({ 'error': 'wrong token' });
        const insertQuery = "INSERT INTO recipient (name, phone_number, user_id) VALUES (\"" + fullName + "\", \"" + phoneNumber + "\", " + userId + ");"
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.query(insertQuery, (err, result) => {
                if (err) res.status(500).json({ message: 'cannot add recipient' });
                else return res.status(200).json({
                    recipient: result.insertId
                });
            })
            connection.release();
        })
    },
    reinitializePassword: (req, res) => {
        const email = req.body.email
        if (email == null) {
            return res.status(400).json({ message: 'missing parameter' });
        }
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ message: 'email is not valid' });
        }

        var nbResultCount;
        const selectQuery = "SELECT COUNT(*) as emailsFoundCount FROM user WHERE email=\"" + email + "\";"
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.query(selectQuery, function (error, results) {
                if (error) return res.status(500).json({ message: 'unable to modify user password' }); 
                nbResultCount = results[0].emailsFoundCount
                if (nbResultCount == 0) return res.status(409).json({ message: 'user not exist' })
                
                let newPassword = Math.random().toString(36).slice(-8)
                bcrypt.hash(newPassword, 10, (err, bcryptedPassword) => {
                    if (err) return res.status(500).json({ message: 'cannot update user password' });
                    const updateQuery = "UPDATE user SET password = \"" + bcryptedPassword + "\" WHERE email=\"" + email + "\";"
                    connection.query(updateQuery, (err, result) => {
                        if (err) return res.status(500).json({ message: 'cannot update user password' });
                    })
                
                    const recipient = "abdkarim.balde@gmail.com"  // email
                    const mSubject = "Confirmation du changement de votre mot de passe Visuum"
                    const mailContent = "<p>Bonjour,<br/><br/>Vous avez demandé à changer le mot de passe de votre compte.<br/><br/>Veuillez trouver ci-dessous le " + 
                                        "nouveau mot de passe vous permettant de vous y connecter :<br/><br/>Mot de passe : " + newPassword + "<br/><br/>. " + 
                                        "Votre identifiant reste inchangé.<br/><br/>Merci de votre confiance,</p>"
                    
                    // mail.sendMail(recipient, mSubject, mailContent)
                    console.log('reinitialize password mail content : ', mailContent)
                    return res.status(201).json({
                        mail_sended: 'OK',
                    });
                })
            });
            connection.release();
        });
    }
}