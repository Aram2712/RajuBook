const {validationResult} = require("express-validator");
const url = require("url");
const User = require('../moduls/register.js');
const nodemailer = require('nodemailer');
let img = ('../public/logos/logo.png');
let footer = ('../public/logos/footer.png');

/**Users registration and sending welcome message to email**/

exports.register = (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const vErr = validationResult(req.body)
    if (!vErr.isEmpty()) {
        const arrParam = vErr.array()[0].param
        if (arrParam === 'fullName' || arrParam === 'email' || arrParam === 'password' || arrParam === 'city'
            || arrParam === 'phone' || arrParam === 'whatsapp') {
            return res.redirect(url.format({
                pathname: '/',
                query: {
                    error: arrParam
                }
            }))
        }
    }
    const user = new User(req.body.fullName, req.body.email, req.body.password, req.body.city, req.body.phone, req.body.whatsapp);
    let name = req.body.fullName;
    let email = req.body.email;
    user.register()
        .then(result => {
            User.sendUserInfo(result)
                .then(infoComingFromDb => {
                    let transporter = nodemailer.createTransport({
                        pool: true,
                        host: process.env.EMAIL_HOSTNAME,
                        port: '465',
                        secure: true,
                        auth: {
                            user: process.env.GMAIL_ADDRESS,
                            pass: process.env.GMAIL_PASSWORD
                        }
                    });


                    let mailOptions = {
                        from: process.env.GMAIL_ADDRESS,
                        to: email,
                        subject: 'Rajubooks',
                        html: ` <!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                                     <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                                                 <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                     <title>Rajubooks</title>
                        </head>
                        <body style="text-align: center">
                              <div style="background-color: #0f131a;opacity: 0.8">
                                     <img src="cid:unique@cid.ee" width="200px" style="margin: 10px" alt="logo"/>
                              </div>
                              <h1 style="margin: 20px">Dear ${name}</h1>
                              <h2 style="margin: 20px">Welcome to Rajubooks</h2>
                              <div>
                                  <p style="margin: 20px auto;width: 300px ">
                                    Welcome to Rajubooks. We are happy to greet you in our site.
                                    We have multiple sites on our palatform  for our clients.
                                    With  24 X 7 withdrawal & deposit facilities.
                                  </p>
                              </div>
                              <button style="width: 150px;height: 40px;border-radius:6px;border: none; background-color: #fd4fc1;margin: 20px">
                                  <a href="${process.env.HOSTNAME}" style="text-decoration: none; color:white;font-weight: 600">RAJUBOOKS</a>
                              </button>
                              <footer>
                                  <img src="cid:footer@cid.ee" alt="footer" style="width: 100%"/>
                              </footer>
                        </body>
                        </html>
                                 `,
                        attachments: [
                            {
                                filename: 'logo.png',
                                path: process.env.SERVER_LOCAL_URL + img.slice(9),
                                cid: 'unique@cid.ee'
                            },
                            {
                                filename:'footer.png',
                                path:process.env.SERVER_LOCAL_URL + footer.slice(9),
                                cid:'footer@cid.ee'
                            }
                        ]
                    };

                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) console.log(err)
                        res.send(infoComingFromDb)
                    })


                })
                .catch(err => {
                    if (err) res.sendStatus(404)
                })
        })
        .catch(err => {
            console.log(err)
            if (err.errno === 1062) {
                res.send('User already exist')
            }
        })

}
