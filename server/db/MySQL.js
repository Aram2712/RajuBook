const mysql = require('mysql2');

const connect = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "raju_books",
    password: "root"
}).promise();

// const connect = mysql.createConnection({
//     host: process.env.DB_HOSTNAME,
//     user:process.env.DB_USERNAME,
//     database: process.env.DATABASE,
//     password: process.env.DB_PASSWORD
// }).promise();

module.exports = connect;