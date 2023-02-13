const connect = require('../db/MySQL');

module.exports = class OnlinePayment {
    constructor(order_id, transaction_amount, return_url, game_name, player_email, player_mobile) {
        this.order_id = order_id;
        this.transaction_amount = transaction_amount;
        this.return_url = return_url;
        this.game_name = game_name;
        this.player_email = player_email;
        this.player_mobile = player_mobile;
    }

    paymentGateway() {
        let gatewayInfo = [this.order_id, this.transaction_amount, this.return_url,
            this.game_name, this.player_email, this.player_mobile];
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO onlinepayment(order_id, transaction_amount, return_url,game_name, player_email, player_mobile) VALUES (?,?,?,?,?,?)';
            connect.query(sql, gatewayInfo)
                .then(result => {
                    resolve(result[0].insertId)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static getOrderId(email) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT order_id FROM onlinepayment WHERE player_email=?';
            connect.query(sql, [email])
                .then(result => {
                    resolve(result[0])
                })
                .catch(err => {
                    reject(err)
                })

        })
    }
}