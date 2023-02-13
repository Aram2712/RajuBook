const Payment = require('../moduls/ownerInfoForDeposit.js');

/**Send Owner payment data to FrontEnd**/

exports.getOwnerData = (req, res) => {
    Payment.sendToClient()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            if (err) return res.sendStatus(404)
        })
}

