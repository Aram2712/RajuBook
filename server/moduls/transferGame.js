const connect = require('../db/MySQL.js');

module.exports = class Transfer {
    constructor(userId, status, from_gameTitle, to_gameTitle, userName, amount) {
        this.userId = userId;
        this.status = status;
        this.from_gameTitle = from_gameTitle;
        this.to_gameTitle = to_gameTitle;
        this.userName = userName;
        this.amount = amount
    }

    transferGames() {
        let gameArr = [this.userId, this.status, this.from_gameTitle, this.to_gameTitle, this.userName, this.amount];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO transfer_games(userId,status, from_gameTitle, to_gameTitle, userName,amount) VALUES (?,?,?,?,?,?)';
            connect.query(sql, gameArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static findTransfers(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM transfer_games WHERE userId=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getTransfers() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM transfer_games';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static findForConfirmTransfers(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM transfer_games WHERE id=?';
            connect.query(sql,[id])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    static confirmTransfer(confInform){
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE transfer_games SET status=? WHERE id=?';
            connect.query(sql,confInform)
                .then(result => {
                    resolve(result)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}