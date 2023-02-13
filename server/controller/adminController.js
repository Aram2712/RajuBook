const {validationResult} = require('express-validator');
const AdminEmail = require('../moduls/adminEmail.js'),
    Users = require('../moduls/usersLogin.js'),
    Owner = require('../moduls/payment.js'),
    Withdrawal = require('../moduls/withdrawal.js'),
    GameId = require('../moduls/getID.js'),
    GameTransfer = require('../moduls/transferGame.js'),
    MyId = require('../moduls/myIdForUsers.js');
const FindUsers = require('../moduls/usersLogin.js');
const url = require("url");
const emailSendingPath = ('../views/admin/emailSending.ejs'),
    dashboardPath = ('../views/admin/welcome.ejs'),
    usersListPath = ('../views/admin/usersList.ejs'),
    ownerCardPath = ('../views/admin/ownData.ejs'),
    ownerDataChangePath = ('../views/admin/changeOwnerData.ejs'),
    depositRequestPath = ('../views/admin/depositRequest.ejs'),
    getUsersInfo = ('../views/admin/getUsersAllInfo.ejs'),
    withdrawalPath = ('../views/admin/withdrawal.ejs'),
    gameIdPath = ('../views/admin/gameId.ejs'),
    gameTransferPath = ('../views/admin/gameTransfers.ejs'),
    gameConfirmPath = ('../views/admin/confirmGame.ejs');
const oneDay = 1000 * 60 * 60 * 24;
/**Welcome page**/
exports.sendPasswordToEmail = (req, res) => {
    res.render(emailSendingPath, {
        title: 'Admin login'
    })
};

/**Write password with email address**/

exports.adminLogin = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const adminInfo = validationResult(req.body);
    if (!adminInfo.isEmpty()) {
        const arrParam = adminInfo.array()[0].param;
        if (arrParam === 'password') {
            return req.redirect(url.format({
                pathname: '/',
                error: arrParam
            }))
        }
    }
    let {email, password} = req.body;
    AdminEmail.adminVerify(email, password)
        .then(result => {
            if (result.id > 0) {
                session = req.session;
                session.userid = result.id
                res.cookie('Raju', result.adminSecret, {
                    maxAge: oneDay,
                    httpOnly: true,
                })
                res.render(dashboardPath, {
                    title: 'Welcome'
                })
            } else if (result === false) {
                res.render(emailSendingPath, {
                    title: 'Wrong email or password'
                })
            }
        })
        .catch(err => {
            if (err === undefined) {
                res.render(emailSendingPath, {
                    title: 'Wrong email or password'
                })
            }
        })

}

/**User search**/
exports.userSearch = (req, res) => {
    if (!req.body) return res.sendStatus(404);
    const searchErr = validationResult(req.body);
    if (!searchErr.isEmpty()) {
        const searchErrArr = searchErr.array()[0].param
        if (searchErrArr === 'search') {
            res.redirect(url.format({
                query: {
                    error: searchErr
                }
            }))
        }
    }
    let {search} = req.body;
    Users.usersSearch(search)
        .then(result => {
            res.render(usersListPath, {
                title: 'Users',
                users: result
            })
        })
        .catch(err => {
            if (err) res.send('error')
        })
}

/**Check all registered users**/

exports.getAllUsers = (req, res) => {
    FindUsers.getAllUsers()
        .then(result => {
            res.render(usersListPath, {
                title: 'Users',
                users: result
            })
        })
        .catch(err => {
            console.log(err)
        })
}

/**Owner parameters**/

exports.getOwnData = (req, res) => {
    Owner.getOwnerInfo()
        .then(result => {
            res.render(ownerCardPath, {
                title: 'Owner Data',
                params: result
            })
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

exports.changeOwnData = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const adminInfo = validationResult(req.body);
    if (!adminInfo.isEmpty()) {
        const arrParam = adminInfo.array()[0].param;
        if (arrParam === 'id') {
            return req.redirect(url.format({
                pathname: '/',
                error: arrParam
            }))
        }
    }

    let id = req.body.id;
    Owner.changeOwnerData(id)
        .then(result => {
            Owner.changeOwnerDataWithOut(id)
                .then(result => {
                    res.render(ownerDataChangePath, {
                        title: 'Change Data',
                        param: result
                    })
                })
                .catch(err => {
                    if (err) return res.sendStatus(404)
                })
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

exports.confirmChanging = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'title' || arrParam === 'acc_no' || arrParam === 'ifsc'
            || arrParam === 'phone_no' || arrParam === 'upi_id' || arrParam === 'holder_name'
            || arrParam === 'min_dep' || arrParam === 'max_dep' || arrParam === 'id') {
            return res.redirect(url.format({
                pathname: '/admin',
                query: {
                    error: arrParam
                }
            }))
        }
    }

    const paymentData = [req.body.title, req.body.acc_no, req.body.ifsc, req.body.phone_no, req.body.upi_id, req.body.holder_name, req.body.min_dep, req.body.max_dep, req.file.path, req.body.id];
    Owner.updateOwnerParams(paymentData)
        .then(result => {
            Owner.getOwnerInfo()
                .then(result => {
                    res.render(ownerCardPath, {
                        title: 'Owner Data',
                        params: result
                    })
                })
        })
        .catch(err => {
            if (err) return Owner.getOwnerInfo()
                .then(result => {
                    res.render(ownerCardPath, {
                        title: 'Owner Data',
                        params: result
                    })
                })
                .catch(err => {
                    if (err) return res.sendStatus(404)
                })
        })
}

/**Deposit Requests from User**/

exports.depositRequest = (req, res) => {
    Owner.getDepositRequests()
        .then(result => {
            res.render(depositRequestPath, {
                title: 'Deposit request',
                result
            })
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

/**Confirm Game Creating**/

exports.confirmGameCreating = (req, res) => {
    let {id, confirm} = req.body;
    console.log(req.body)
    let info = [confirm, id];
    Users.depositRequestConfirmingFromAdmin(info)
        .then(result => {
            if (result === true){
                Owner.getDepositRequests()
                    .then(result => {
                        res.render(depositRequestPath, {
                            title: 'Deposit request',
                            result
                        })
                    })
                    .catch(err => {
                        if (err) return res.sendStatus(404)
                    })
            }
        })
        .catch(err => {
            if (err) return false
        })
}

/**Delete confirmed request**/
exports.deleteDepRequest = (req, res) => {
    let {id} = req.body
    Owner.deleteRequestImage(id)
        .then(result => {
            if (result === true) {
                Owner.deleteDepositRequest(id)
                    .then(done => {
                        if (done === true) {
                            return Owner.getDepositRequests()
                                .then(result => {
                                    res.render(depositRequestPath, {
                                        title: 'Deposit request',
                                        result
                                    })
                                })
                                .catch(err => {
                                    if (err) return res.sendStatus(404)
                                })
                        }
                    })
            }
        })
}

/**Confirm balance**/

exports.sendBalance = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'id') {
            return res.redirect(url.format({
                pathname: '/admin',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    let id = req.body.id;
    AdminEmail.getBalance(id)
        .then(result => {
            res.render(getUsersInfo, {
                title: 'Confirm Balance',
                result
            })
        })
        .catch(err => {
            console.log(err)
        })

}

exports.confirmBalance = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'balance') {
            return res.redirect(url.format({
                pathname: '/admin',
                query: {
                    error: arrParam
                }
            }))
        }
    }

    let confirmedInfo = [req.body.balance, req.body.id];
    AdminEmail.confirmBalance(confirmedInfo)
        .then(result => {
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
    FindUsers.getAllUsers()
        .then(result => {
            res.render(usersListPath, {
                title: 'Users',
                users: result
            })
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

/**Withdrawal Requests**/

exports.withdrawal = (req, res) => {

}

/**Get Game ID**/
exports.gameId = (req, res) => {
    GameId.getCreatedGames()
        .then(result => {
            res.render(gameIdPath,{
                title:'Game ID',
                result
            })
        })
        .catch(err => {
            console.log(err)
        })
}

exports.gameEditingPage = (req,res) => {

}

/**Game Transfers**/

exports.myIdPage = (req, res) => {
    res.render(gameTransferPath, {
        title: 'My ID',
        message: '',
        error: ''
    })
}

exports.createMyId = (req, res) => {

    let {gameName, username, password, holderEmail, amount} = req.body;
    Users.findUser(holderEmail)
        .then(result => {
            if (result === undefined) {
                res.render(gameTransferPath, {
                    title: 'My ID',
                    message: 'Something went wrong 🤔',
                    error: 'error'
                })
            } else {
                let userId = result.id;
                let myIdInfo = new MyId(userId, gameName, username, password, holderEmail, amount);
                myIdInfo.createMyId()
                    .then(create => {
                        if (create > 0) {
                            res.render(gameTransferPath, {
                                title: 'My ID',
                                message: 'User game id created 😉',
                                error: 'no'
                            })
                        }
                    })

            }
        })
        .catch(err => {
            if (err === undefined) {
                console.log('User not found')
            }
        })
}

exports.confirmTransfer = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const transferParam = vErr.array()[0].param
        if (transferParam === 'status') {
            return res.redirect(url.format({
                pathname: '/admin',
                query: {
                    error: transferParam
                }
            }))
        }
    }

    let id = req.body.id;

    GameTransfer.findForConfirmTransfers(id)
        .then(result => {
            res.render(gameConfirmPath, {
                title: 'Confirm Game Transfer',
                result
            })
        }).catch(err => {
        res.sendStatus(404)
    })

}

exports.confirmGameTransfer = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req);
    if (!vErr.isEmpty()) {
        const transferParam = vErr.array()[0].param
        if (transferParam === 'id' || transferParam === 'status') {
            return res.redirect(url.format({
                pathname: '/admin',
                query: {
                    error: transferParam
                }
            }))
        }
    }

    let confInfo = [req.body.status, req.body.id];

    GameTransfer.confirmTransfer(confInfo)
        .then(result => {
            if (result) {
                GameTransfer.getTransfers()
                    .then(result => {
                        res.render(gameTransferPath, {
                            title: 'Transfer',
                            result
                        })
                    })
                    .catch(err => {
                        if (err) return res.sendStatus(404)
                    })
            }

        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })

}

/**Admin sign out**/

exports.signOut = (req, res) => {
    res.redirect('/')
}