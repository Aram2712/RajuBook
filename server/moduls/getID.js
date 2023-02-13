const connect = require('../db/MySQL.js');
const bcrypt = require("bcrypt");
const saltRound = 10;

module.exports = class GetID {

   constructor() {
   }

   static getCreatedGames(){
       return new Promise((resolve, reject) => {
           let sql = 'SELECT id,gameName, userName,holderName, amount FROM users_deposited_games';
           connect.query(sql)
               .then(result => {
                   resolve(result[0])
               })
               .catch(err => {
                   if (err) return reject(false)
               })
       })
   }

   static findAndSendGameId(id){
       return new Promise((resolve, reject) => {
           let sql = 'SELECT * FROM users_deposited_games WHERE userId=?';
           connect.query(sql,[id])
               .then(result => {
                   resolve(result[0])
               })
               .catch(err => {
                   reject(err)
               })
       })
   }
}