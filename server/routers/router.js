const express = require('express');
const registerController = require('../controller/registerController.js'),
    loginController = require('../controller/loginController.js'),
    adminController = require('../controller/adminController.js'),
    paymentController = require('../controller/paymentController.js');
const mainRouter = express.Router();
const multer = require('multer');

const storageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/uploadedimages')
        // console.log(file)
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + (file.originalname))
    }
});

/**Filtering image type**/
const fileFilter = (req, file, cb) => {
    if (file.mimetype === `image/png` ||
        file.mimetype === `image/jpg` ||
        file.mimetype === `image/jpeg`) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const loader = multer({storage: storageConfig, fileFilter: fileFilter}).single('fileData')


/**Router about users**/

mainRouter.post('/register', registerController.register);
mainRouter.post('/login_users', loginController.login);
mainRouter.post('/send_balance', loginController.sendBalance);
mainRouter.post('/change_password',loginController.changePassword);
mainRouter.post('/restore_password', loginController.sendPasswordToEmail);
mainRouter.post('/create_account_for_users', loginController.paymentAccounts);
mainRouter.post('/get_all_bank_accounts', loginController.bankAccounts);
mainRouter.post('/deposit_request', loginController.sendDepositInfo);
mainRouter.post('/deposit_request_image', loader, loginController.sendDepositImage);
mainRouter.post('/delete_bank_account', loginController.deleteAccount);
mainRouter.post('/find_transfer', loginController.findRequests);
mainRouter.post('/withdrawal_request', loginController.withdrawalRequest);
mainRouter.post('/transfer_between_games', loginController.transfer);
mainRouter.post('/find_game_transfers', loginController.findTransfers);
mainRouter.post('/delete_deposit_request', adminController.deleteDepRequest);
mainRouter.post('/payment',loginController.depositOnline);
mainRouter.post('/withdrawal',loginController.withdrawal);
mainRouter.post('/get_payment_status',loginController.paymentStatus);
mainRouter.post('/deactivate_account',loginController.deactivateAccount);
mainRouter.post('/send_user_my_id',loginController.gameId);

/**Admin Routers**/
mainRouter.get('/', adminController.sendPasswordToEmail);
mainRouter.post('/admin_verifying', adminController.adminLogin);
mainRouter.post('/users_list', adminController.getAllUsers);
mainRouter.post('/search_users',adminController.userSearch);
mainRouter.post('/owner_payment_data', adminController.getOwnData);
mainRouter.post('/owner_data_change/:id', adminController.changeOwnData);
mainRouter.post('/find_deposits_request', adminController.depositRequest);
mainRouter.post('/confirm_deposit_for_game',adminController.confirmGameCreating);
mainRouter.post('/confirm_requested_balance/:id', adminController.sendBalance);
mainRouter.post('/confirm_balance', adminController.confirmBalance);
mainRouter.post('/withdrawal_requests', adminController.withdrawal);
mainRouter.post('/get_game_id', adminController.gameId);
mainRouter.post('/edit_user_game_info', adminController.gameEditingPage);
mainRouter.post('/my_id_creator_page', adminController.myIdPage);
mainRouter.post('/create_game_acc_for_users',adminController.createMyId)
mainRouter.post('/confirm_gameTransfer/:id', adminController.confirmTransfer);
mainRouter.post('/confirm_game_transfer', adminController.confirmGameTransfer)

const qrStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/ownerQR')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + (file.originalname))
    }
});
const qrLoader = multer({storage: qrStorage}).single('qrData')
mainRouter.post('/confirm_changing_own_data', qrLoader, adminController.confirmChanging);


/**Payment Parameter Routers**/

mainRouter.get('/owner_parameters', paymentController.getOwnerData);
mainRouter.get('/sign-out', adminController.signOut);

module.exports = mainRouter;