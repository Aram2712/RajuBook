const connect = require('../db/MySQL.js');
const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports = class Authorization {
    constructor(userId, bankInfo, accountNo, ifscCode, phoneNo, upiId, holderName, password) {
        this.userId = userId;
        this.bankInfo = bankInfo;
        this.accountNo = accountNo;
        this.ifscCode = ifscCode;
        this.phoneNo = phoneNo;
        this.upiId = upiId;
        this.holderName = holderName;
        this.password = password
    }

    static login(email, password) {
        return new Promise((resolve, reject) => {
                const sql = 'SELECT id,fullName,email,balance,phone,password  FROM users WHERE email = ?';
                connect.query(sql, [email])
                    .then(result => {
                        const userInfo = result[0][0]
                        if (userInfo.id > 0) {
                            if (!bcrypt.compareSync(password, userInfo.password)) {
                                reject(false)
                                throw resolve(userInfo.id)
                            }
                            resolve(userInfo)
                        } else {
                            reject(false)
                        }
                    })
                    .catch(err => {
                        if (err) {
                            reject(false)
                        }

                    })
            }
        )
    }

    static changePassword(newPassword, email) {
        let hash = bcrypt.hashSync(newPassword, saltRound)
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE users SET password=?,resortPassword=? WHERE email=?';
            connect.query(sql, [hash, newPassword, email])
                .then(result => {
                    if (result) {
                        resolve(true)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getAllUsers() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,fullName,email,city,phone,whatsapp,balance FROM users';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static restore(email) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT fullName,resortPassword FROM users WHERE email = ?';
            connect.query(sql, [email])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    if (err) return reject(undefined)
                })
        })
    }

    static checkUser(email, password) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,email,password FROM users WHERE email = ?';
            connect.query(sql, [email])
                .then(result => {
                    const checkInfo = result[0][0]
                    if (checkInfo.id > 0) {
                        if (!bcrypt.compareSync(password, checkInfo.password)) {
                            reject(false)
                            throw resolve(checkInfo.id)
                        }
                        resolve(checkInfo.id)
                    } else {
                        reject(false)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    createUserBankAcc() {
        let hash = bcrypt.hashSync(this.password, saltRound)
        let bankAccountArr = [this.userId, this.bankInfo, this.accountNo, this.ifscCode, this.phoneNo, this.upiId, this.holderName, hash];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO users_pay_accounts(userId,bankInfo, accountNo, ifscCode, phoneNo, upiId, holderName, password) VALUES (?,?,?,?,?,?,?,?)';
            connect.query(sql, bankAccountArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static sendBalance(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT balance FROM users WHERE id=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getBankAccounts(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,bankInfo,accountNo,ifscCode,upiId,phoneNo,holderName FROM users_pay_accounts where userId=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static usersSearch(search) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,fullName,email,city,phone,whatsapp,balance FROM users WHERE fullName=?';
            connect.query(sql, [search])
                .then(result => {
                    if (result[0].length === 0) {
                        let sql = 'SELECT id,fullName,email,city,phone,whatsapp,balance FROM users WHERE email=?';
                        connect.query(sql, [search])
                            .then(result => {
                                if (result[0].length === 0) {
                                    let sql = 'SELECT id,fullName,email,city,phone,whatsapp,balance FROM users WHERE phone=?';
                                    connect.query(sql, [search])
                                        .then(result => {
                                            resolve(result[0])
                                        })
                                        .catch(err => {
                                            reject(err)
                                        })
                                } else {
                                    resolve(result[0])
                                }
                            })
                            .catch(err => {
                                reject(err)
                            })
                    } else {
                        resolve(result[0])
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static deactivateAccount(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM users WHERE id=?';
            connect.query(sql, [id])
                .then(result => {
                    if (result) {
                        resolve(true)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static findUser(email){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id, fullName,email,phone FROM users WHERE email=?';
            connect.query(sql,[email])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    if (err) return reject(undefined)
                })
        })
    }

    static updateDepositRequestStatus(statusInfo){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE onlinepayment SET status=? WHERE order_id=?';
            connect.query(sql,statusInfo)
                .then(result => {
                    if (result){
                        resolve(true)
                    }
                })
                .catch(err => {
                    if (err) {
                        return reject(undefined)
                    }
                })
        })
    }

    static depositRequestConfirmingFromAdmin(info){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE onlinepayment SET gameStatus=? WHERE id=?';
            connect.query(sql,info)
                .then(result => {
                    if (result){
                        resolve(true)
                    }
                })
                .catch(err => {
                    if (err) return reject(false)
                })
        })
    }
}