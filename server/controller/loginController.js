const {validationResult} = require("express-validator");
const url = require("url");
const Authentication = require('../moduls/usersLogin.js'),
    Payment = require('../moduls/payment.js'),
    ImageUploading = require('../moduls/image_uploading.js'),
    Withdrawal = require('../moduls/withdrawal.js'),
    GetID = require('../moduls/getID.js'),
    TransferGames = require('../moduls/transferGame.js'),
    OnlineGateway = require('../moduls/onlinePayment.js'),
    Admin = require('../moduls/adminEmail.js');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');
let img = ('../public/logos/logo.png');
let footer = ('../public/logos/footer.png');

/**User login**/

exports.login = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param

        if (arrParam === 'password' || arrParam === 'email') {
            return res.redirect(url.format({
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const name = req.body.email;
    const pass = req.body.password;
    Authentication.login(name, pass)
        .then(result => {
            const id = result.id
            if (Number.isInteger(id)) {
                session = req.session;
                session.userid = id
            }
            res.send(result)
        })
        .catch(err => {
            if (err === false) res.send('Invalid email or password')
        })
}

/**Forgot password**/

exports.sendPasswordToEmail = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'email') {
            return res.redirect(url.format({
                query: {
                    error: arrParam
                }
            }))
        }
    }
    let email = req.body.email;
    Authentication.restore(email)
        .then(result => {
            let resPass = result.resortPassword,
                name = result.fullName;

            let transporter = nodemailer.createTransport({
                pool: true,
                host: process.env.EMAIL_HOSTNAME,
                port: '465',
                secure: true,
                auth: {
                    user: process.env.GMAIL_ADDRESS,
                    pass: process.env.GMAIL_PASSWORD
                }
            });


            let mailOptions = {
                from: process.env.GMAIL_ADDRESS,
                to: email,
                subject: 'Rajubooks',
                html: ` <!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                                     <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                                                 <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                     <title>Rajubooks</title>
                        </head>
                        <body style="text-align: center">
                              <div style="background-color: #0f131a;opacity: 0.8">
                                     <img src="cid:unique@cid.ee" width="200px" style="margin: 10px" alt="logo"/>
                              </div>
                              <h1 style="margin: 20px">Dear ${name}</h1>
                              <h2 style="margin: 20px">Your password is </h2>
                              <h2 style="margin: 20px">${resPass}</h2>
                              <button style="width: 150px;height: 40px;border-radius:6px;border: none; background-color: #fd4fc1;margin: 20px">
                                  <a href="${process.env.HOSTNAME}" style="text-decoration: none; color:white;font-weight: 600">RAJUBOOKS</a>
                              </button>
                              <footer>
                                  <img src="cid:footer@cid.ee" alt="footer" style="width: 100%"/>
                              </footer>
                        </body>
                        </html>
                                 `,
                attachments: [
                    {
                        filename: 'logo.png',
                        path: process.env.SERVER_LOCAL_URL + img.slice(9),
                        cid: 'unique@cid.ee'
                    },
                    {
                        filename: 'footer.png',
                        path: process.env.SERVER_LOCAL_URL + footer.slice(9),
                        cid: 'footer@cid.ee'
                    }
                ]
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                } else {
                    res.send('Password sent to email')
                }
            })
        })
        .catch(err => {
            if (err) {
                res.send('This mail doesn`t exist')
            }
        })
}

/**Change user password**/
exports.changePassword = (req, res) => {
    let {email, password, newPassword} = req.body;
    Authentication.login(email, password)
        .then(result => {
            const id = result.id
            if (Number.isInteger(id)) {
                session = req.session;
                session.userid = id;
            }

            Authentication.changePassword(newPassword, email)
                .then(result => {
                    if (result) {
                        res.send('Password has changed')
                    }
                })
                .catch(err => {
                    if (err) {
                        res.send('Oooops!!🙃 Something went wrong')
                    }
                })
        })
        .catch(err => {
            if (err === false) res.send('Invalid email or password')
        })
}
/**Sending balance**/

exports.sendBalance = (req, res) => {
    if (!req.body) res.sendStatus(404)
    const balanceErr = validationResult(req.body)
    if (!balanceErr.isEmpty()) {
        const balanceErrParam = balanceErr.array()[0].param
        if (balanceErrParam === 'id') {
            return res.redirect(url.format({
                query: {
                    error: balanceErrParam
                }
            }))
        }
    }

    let id = req.body.id;
    Authentication.sendBalance(id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            if (err) {
                if (err) return res.sendStatus(404)
            }
        })
}

/**Create users payment account**/

exports.paymentAccounts = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param

        if (arrParam === 'password') {
            return res.redirect(url.format({
                query: {
                    error: arrParam
                }
            }))
        }
    }
    let email = req.body.holderName;
    let password = req.body.password;

    Authentication.checkUser(email, password)
        .then(result => {
            if (Number(result)) {
                let bankAccount = new Authentication(req.body.id, req.body.bankInfo, req.body.accountNo, req.body.ifscCode, req.body.phoneNo, req.body.upiId, req.body.holderName, req.body.password);
                bankAccount.createUserBankAcc()
                    .then(result => {
                        res.send(result.toString())
                    })
                    .catch(err => {
                        if (err) return res.sendStatus(404)
                    })
            }
        })
}

/**Get user payment accounts with help user ID**/
exports.bankAccounts = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'id') {
            return res.redirect(url.format({
                query: {
                    error: arrParam
                }
            }))
        }
    }

    let id = req.body.id;

    Authentication.getBankAccounts(id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

/**Do deposit**/

exports.sendDepositInfo = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        console.log(arrParam)
        if (arrParam === 'id' || arrParam === 'deposit' || arrParam === 'exchange'
            || arrParam === 'account' || arrParam === 'amount') {
            return res.redirect(url.format({
                query: {
                    error: arrParam
                }
            }))
        }
    }

    let depositRequest = new Payment(req.body.id, 'Deposit', req.body.exchange, req.body.account, req.body.amount);
    depositRequest.sendDepositRequest()
        .then(result => {
            res.send(result.toString())
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

exports.sendDepositImage = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'imagePath') {
            return res.redirect(url.format({
                query: {
                    error: arrParam
                }
            }))
        }
    }

    let id = req.body.id
    let imagePath = new ImageUploading(req.file.path)

    imagePath.sendDepositRequestImage(id)
        .then(result => {
            res.send(result.toString())
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

/**Delete Bank Account**/

exports.deleteAccount = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param

        if (arrParam === 'deleteId') {
            return res.redirect(url.format({
                query: {
                    error: arrParam
                }
            }))
        }
    }

    let id = req.body.id;

    Payment.deleteBankAccount(id)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}


/**Withdrawal Request **/

exports.withdrawalRequest = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'id' || arrParam === 'withdrawal' || arrParam === 'exchange'
            || arrParam === 'account' || arrParam === 'amount') {
            return res.redirect(url.format({
                query: {
                    error: arrParam
                }
            }))
        }
    }

    let withdrawal = new Withdrawal(req.body.id, 'Withdrawal', req.body.exchange, req.body.account, req.body.amount);
    withdrawal.withdrawalRequest()
        .then(result => {
            res.send(result.toString())
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })

}

/**Requests and transfers**/
exports.findRequests = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const transferParams = vErr.array()[0].param
        if (transferParams === 'id') {
            return res.redirect(url.format({
                query: {
                    error: transferParams
                }
            }))
        }
    }
    let id = req.body.id;
    Payment.getSelectedRequests(id)
        .then(result => {
            Payment.getWithdrawalRequests(id)
                .then(withdrawal => {
                    let arr = [result, withdrawal]
                    res.send(arr)
                })
                .catch(err => {
                    if (err) return res.sendStatus(404)
                })
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

/**Game Transfers**/

exports.transfer = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const transferParam = vErr.array()[0].param
        if (transferParam === 'id' || transferParam === 'from_gameTitle'
            || transferParam === 'to_gameTitle' || transferParam === 'userName' || transferParam === 'amount') {
            return res.redirect(url.format({
                query: {
                    error: transferParam
                }
            }))
        }
    }

    let transferInfo = new TransferGames(req.body.id, 'Expectation', req.body.from_gameTitle, req.body.to_gameTitle, req.body.userName, req.body.amount);
    transferInfo.transferGames()
        .then(result => {
            res.send(result.toString())
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

exports.findTransfers = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const transferParam = vErr.array()[0].param
        if (transferParam === 'id') {
            return res.redirect(url.format({
                query: {
                    error: transferParam
                }
            }))
        }
    }

    let id = req.body.id;
    TransferGames.findTransfers(id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

/**Send My id**/

exports.gameId = (req, res) => {
    let {id} = req.body;
    GetID.findAndSendGameId(id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            if (err) res.send(undefined)
        })
}

/**Online payment**/

exports.depositOnline = (req, res) => {

    let {order_id, transaction_amount, return_url, player_email, player_mobile, game_name} = req.body;
    let paymentGateway = new OnlineGateway(order_id, transaction_amount, return_url, game_name.value, player_email, player_mobile);
    paymentGateway.paymentGateway()
        .then(result => {
            const url = 'https://checkout.payzcart.com/api/v1/create/transaction';
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    APPID: 'APP_3CLI134XDIMX3GPHAXRX',
                    SALT: '4691439582682186838258829518689346177178958587535152195925563372641346'
                },
                body: JSON.stringify({
                    order_id: order_id.toString(),
                    transaction_amount: transaction_amount,
                    return_url: return_url,
                    player_email: player_email,
                    player_mobile: player_mobile,
                    udf1: game_name.value
                })
            };

            fetch(url, options)
                .then(res => res.json())
                .then(json => {
                    res.send(json);
                })
                .catch(err => console.error('error:' + err));

        })
        .catch(err => {
            console.log(err)
        })

}

/**Check payment status**/
exports.paymentStatus = (req, res, next) => {
    let {transactionId, email} = req.body;
    
    const url = 'https://checkout.payzcart.com/api/v1/fetch/transaction';
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            APPID: 'APP_3CLI134XDIMX3GPHAXRX',
            SALT: '4691439582682186838258829518689346177178958587535152195925563372641346'
        },
        body: JSON.stringify({transaction_id: transactionId})
    };
    fetch(url, options)
        .then(res => res.json())
        .then(json => {
            if (json.data.payment_status !== 'Success') {
        
                let statusInfo = [json.data.payment_status, json.data.order_id]
                Authentication.updateDepositRequestStatus(statusInfo)
                    .then(updatedStatusInfo => {
                        console.log(updatedStatusInfo)
                    })
                    .catch(err => {
                        console.log('err', err)
                    })
                let info = [json.data.transaction_amount, email];

                Admin.confirmBalance(info)
                    .then(balance => {
                        console.log(true)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => console.error('error:' + err));

}

/**Online payout**/

exports.withdrawal = (req, res) => {
    let {playerEmail, gameName, amount} = req.body;
    Authentication.findUser(playerEmail)
        .then(result => {
            let withdrawal = new Withdrawal(result.id,playerEmail,gameName,amount);
            withdrawal.createWithdrawalRequest()
                .then(createdId => {
                    if (createdId > 0){
                        res.status(200).send('Request created👌')
                    }
                })
                .catch(err => {
                    if (err){
                        res.status(500).send('Something went wrong🤔')
                    }
                })
        })
        .catch(err => {
            if (err === undefined){
                res.status(500).send('Something went wrong🤔')
            }
        })
}

/**Deactivate account**/

exports.deactivateAccount = (req, res) => {
    if (!req.body) return res.sendStatus(404);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const transferParam = vErr.array()[0].param
        if (transferParam === 'id') {
            return res.redirect(url.format({
                query: {
                    error: transferParam
                }
            }))
        }
    }
    let {id} = req.body;
    Authentication.deactivateAccount(id)
        .then(result => {
            if (result === true) {
                res.send('Your account successfully deactivated')
            }
        })
        .catch(err => {
            if (err) {
                res.send(err)
            }
        })
}