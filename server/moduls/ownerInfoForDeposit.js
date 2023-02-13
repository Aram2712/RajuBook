const connect = require('../db/MySQL.js');

module.exports = class OwnerInfo {
    constructor() {
    }

    static sendToClient() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM owner_info';
            connect.query(sql)
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}