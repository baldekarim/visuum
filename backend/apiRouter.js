// Imports
const express      = require('express');
const shopsCtrl    = require('./routes/shopsCtrl')
const usersCtrl    = require('./routes/usersCtrl');
const vouchersCtrl = require('./routes/vouchersCtrl') 

// Router
exports.router = (function() {
    const apiRouter = express.Router();

    // Shops routes
    apiRouter.route('/shops/').get(shopsCtrl.getAll)
    apiRouter.route('/shops/search/').get(shopsCtrl.searchShop)
    apiRouter.route('/shops/:name').get(shopsCtrl.getShopByName)
  
    // Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/register/validate/').post(usersCtrl.validateRegistering);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/me/address/').put(usersCtrl.updateAddress);
    apiRouter.route('/users/me/password/').put(usersCtrl.updatePassword);
    apiRouter.route('/users/me/password/new/').post(usersCtrl.reinitializePassword);
    apiRouter.route('/users/me/recipients/').get(usersCtrl.getRecipient);
    apiRouter.route('/users/me/recipients/').post(usersCtrl.addRecipient);

    // Vouchers routes
    apiRouter.route('/vouchers/exchange-rate/').get(vouchersCtrl.getExchangeRate)
    apiRouter.route('/vouchers/withdrawals/').get(vouchersCtrl.getWithdrawalPlaces)
    apiRouter.route('/vouchers/transaction').post(vouchersCtrl.createTransaction);
    apiRouter.route('/vouchers/transaction/receipt/:reference').get(vouchersCtrl.getTransactionReceipt)

    return apiRouter;
})();