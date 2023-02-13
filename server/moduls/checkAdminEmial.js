const connect = require('../db/MySQL.js');
const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports = class SentPassword {
    constructor(adminId, password) {
        this.adminId = adminId;
        this.password = password
    }

    passwordSentToEmail() {
        let hash = bcrypt.hashSync(this.password, saltRound);
        let passArr = [this.adminId, hash, this.password];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO admin_verifying(adminId,password, restorePassword) VALUES (?,?,?)';
            connect.query(sql, passArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static loginWithHelpPassword(id,password){
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id, adminId, password FROM admin_verifying where adminId = ?';
            connect.query(sql,[id])
                .then(result => {
                    const admin = result[0][0]
                    if (admin.id > 0) {
                        if (!bcrypt.compareSync(password, admin.password)) {
                            reject(false)
                            throw resolve(admin.id)
                        }
                        resolve(admin)
                    }
                })
                .catch(err => {
                    reject(err)
                })

        })
    }
}