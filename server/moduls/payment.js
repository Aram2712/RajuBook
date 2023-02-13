const connect = require('../db/MySQL.js');

module.exports = class Deposit {
    constructor(userId, deposit, exchange, account, amount) {
        this.userId = userId;
        this.deposit = deposit;
        this.exchange = exchange;
        this.account = account;
        this.amount = amount
    }

    static getOwnerInfo() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT owner_info.id, owner_info.title, owner_info.imgUrl, owner_info.acc_no, owner_info.ifsc, owner_info.phone_no, owner_info.upi_id, owner_info.holder_name, owner_info.min_dep, owner_info.max_dep FROM owner_info';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static changeOwnerData(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT owner_info.id, owner_info.title, owner_info.imgUrl, owner_info.acc_no, owner_info.ifsc, owner_info.phone_no, owner_info.upi_id, owner_info.holder_name, owner_info.min_dep, owner_info.max_dep, owner_info.create_at, owner_info.update_at, owner_info.qrPath FROM owner_info where id=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static changeOwnerDataWithOut(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM owner_info WHERE id=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0][0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static updateOwnerParams(paymentData) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE owner_info SET title=?,acc_no=?,ifsc=?,phone_no=?,upi_id=?,holder_name=?,min_dep=?,max_dep=?,qrPath=? WHERE id = ?';
            connect.query(sql, paymentData)
                .then(result => {
                    resolve(result[0].serverStatus)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    sendDepositRequest() {
        let depositRequestArr = [this.userId, this.deposit, this.exchange, this.account, this.amount];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO deposit_request(userId, deposit,exchange, account, amount) VALUES (?,?,?,?,?)';
            connect.query(sql, depositRequestArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }


    static getDepositRequests() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id, order_id, transaction_amount, return_url,game_name, player_email, player_mobile,status,gameStatus,createAt FROM onlinepayment';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static deleteBankAccount(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM users_pay_accounts WHERE id = ?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getSelectedRequests(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,deposit, exchange, account, amount, create_at FROM deposit_request WHERE userId=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getWithdrawalRequests(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id, withdrawal,exchange, account, amount, create_at FROM withdrawal_request WHERE userId=?';
            connect.query(sql, [id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static deleteRequestImage(id){
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM request_image WHERE request_id=?';
            connect.query(sql,[id])
                .then(result  => {
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static deleteDepositRequest(id){
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM deposit_request WHERE id=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(true)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}