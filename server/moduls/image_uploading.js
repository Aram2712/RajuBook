const connect = require('../db/MySQL.js');

module.exports = class UploadImage{
    constructor(imagePath) {
        this.imagePath = imagePath
    }

    sendDepositRequestImage(id){
        let depositImageArr = [id,this.imagePath];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO request_image(request_id, imagePath) VALUES (?,?)';
            connect.query(sql,depositImageArr)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
}