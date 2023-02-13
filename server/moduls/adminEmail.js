const connect = require('../db/MySQL.js');
const bcrypt = require('bcrypt');

module.exports = class VerifyEmail{
    constructor(email) {
        this.email = email;

    }


    static adminVerify(email, password) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,adminSecret, password FROM admin WHERE email=?';
            connect.query(sql, [email])
                .then(result => {
                    let adminId = result[0][0].id, adminPassword = result[0][0].password;
                    if (adminId > 0) {
                        if (!bcrypt.compareSync(password, adminPassword)) {
                            reject(false)
                            throw resolve(adminId)
                        } else {
                            resolve(result[0][0])
                        }
                    }
                })
                .catch(err => {
                    if (err) return reject(undefined)
                })
        })
    }
    static getBalance(id){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,fullName,email,balance FROM users WHERE id=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static confirmBalance(info){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE users SET balance=? WHERE email=?';
            connect.query(sql,info)
                .then(result => {
                    resolve(result[0].changedRows)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

}

