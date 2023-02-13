const connect = require('../db/MySQL.js');
const bcrypt = require('bcrypt')
const saltRound = 10;

module.exports = class Register {
    constructor(fullName, email, password, city, phone, whatsapp) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.city = city;
        this.phone = phone;
        this.whatsapp = whatsapp;

    }

    register() {
        let hash = bcrypt.hashSync(this.password, saltRound);
        let reactArr = [this.fullName, this.email, hash, this.password, this.city, this.phone, this.whatsapp];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO users(fullName, email, password, resortPassword, city, phone, whatsapp) VALUES ( ?, ?, ?, ?, ?, ?, ? )'
            connect.query(sql, reactArr)
                .then(result => {
                    let id = result[0].insertId
                    resolve(id)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static sendUserInfo(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id, email, balance FROM users WHERE id = ?'
            connect.query(sql, id)
                .then(result => {
                    let infoAboutUser = result[0]
                    resolve(infoAboutUser)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}