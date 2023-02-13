const connect = require('../db/MySQL.js');

module.exports = class Withdrawal {
    constructor(userId, playerEmail, gameName, amount) {
        this.userId = userId;
        this.playerEmail = playerEmail;
        this.gameName = gameName;
        this.amount = amount;
    }

    createWithdrawalRequest(){
        let withArr = [this.userId, this.playerEmail, this.gameName, this.amount];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO withdrawal_request  (userId, playerEmail, gameName, amount) VALUES (?,?,?,?)';
            connect.query(sql,withArr)
                .then(result => {
                    if(result[0].insertId > 0){
                        resolve(result[0].insertId)
                    }
                })
                .catch(err => {
                    resolve(err)
                })
        })
    }
}