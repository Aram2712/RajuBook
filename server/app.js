 require('dotenv').config();
const express = require('express');
const app = express();
const eL = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Router = require('./routers/router.js')
const oneDay = 1000 * 60 * 60 * 24;

app.use(express.urlencoded({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser('MySecretCodeIsVickyBook'));


app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    secure: true,
    cookie: {
        maxAge: oneDay,
        secure: true
    },
    resave: false
}));


app.use(cors());

app.use('/', Router);

app.use(eL)

app.listen(process.env.PORT,()=> {
    console.log('Server has started..')
})