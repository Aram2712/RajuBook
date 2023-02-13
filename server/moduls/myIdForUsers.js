const connect = require('../db/MySQL.js');

module.exports = class MyID{
    constructor(userId,gameName,userName,password,holderName,amount) {
        this.userId = userId;
        this.gameName = gameName;
        this.userName = userName;
        this.password = password;
        this.holderName = holderName;
        this.amount = amount;
    }

    createMyId(){
        let myIdArr = [this.userId, this.gameName, this.userName, this.password, this.holderName, this.amount];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO users_deposited_games (userId, gameName, userName, gameCode, holderName, amount) VALUES (?,?,?,?,?,?)';
            connect.query(sql,myIdArr)
                .then(result => {
                    if (result[0].insertId > 0){
                        resolve(true)
                    }
                })
                .catch(err => {
                    if (err) return reject(false)
                })
        })
    }
}