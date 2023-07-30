var express = require('express'),
    cookieParser = require('cookie-parser'),
    sessions = require('express-session'),
    bodyParser = require('body-parser'),
    https = require('https'),
    fs = require('fs'),
    md5 = require('md5'),
    mongoose = require('mongoose'),
    credentials = require('./credentials'),
    SecureLoginUsers = require('./models/uCredentials.js');

// load env variables
const dotenv = require("dotenv");
dotenv.config();

var app = express();

// db connection
mongoose
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(`DB connection error: ${err.message}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(credentials.cookieSecret));
app.use(sessions({
    resave: true,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
    cookie: { maxAge: 3600000 },
}));

app.set('port', process.env.PORT || 3100);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

function checklogin(req, res, user, password) {
    SecureLoginUsers.findOne({ uname: user }, function (err, resultFound) {
        if (err) {
            return res.status(400).json({ error: err });
        }

        password = md5(password); // Encrypt password

        if (resultFound != null && resultFound.pass === password) {
            req.session.userName = req.body.uname;
            res.redirect(303, "/home");
        } else {
            res.status(401).send("Username or password do not match our records. Please try again or register if you are a new user!");
        }
    });
}


app.post('/processLogin', function (req, res) {
    // Determine if user is registering
    if (req.body.buttonVar == 'login') {
        checklogin(req, res, req.body.uname.trim(), req.body.pword.trim())
    } else {
        res.redirect(303, 'register');
    }
});

app.post('/processReg', function (req, res) {
    const user = new SecureLoginUsers(req.body); // Creating user module.

    if ((req.body.pword.trim() == req.body.pword2.trim()) && req.body.pword != "") {
        user.pass = md5(req.body.pword); // To match pass property in schema with the name of the password input fields. Also, applying md5 encryption to the password.

        SecureLoginUsers.find().countDocuments(function (err, result) {
            console.log("The number of users was " + result);
        });

        SecureLoginUsers.find(async function (err, resultArray) {
            await resultArray.forEach(element => {
                console.log(element.uname);
                console.log(element.pass + "\n");
            });
        });

        user.save((err, toDB) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            req.session.userName = req.body.uname;
            res.redirect(303, "home");
        })
    } else {
        res.sendFile(__dirname + '/public/register.html', { message: 'Passwords did not match. Try again' });
    }
});

app.get('/home', function (req, res) {
    if (req.session.userName) {
        res.sendFile(__dirname + '/public/home.html');
    } else {
        res.sendFile(__dirname + '/public/login.html', { message: 'Please login to access the home page' });
    }
});

app.get('/page2', function (req, res) {
    if (req.session.userName) {
        res.sendFile(__dirname + '/public/page2.html');
    } else {
        res.sendFile(__dirname + '/public/login.html', { message: 'Please login to access the second page' });
    }
});

app.get('/register', function (req, res) {
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/logout', function (req, res) {
    delete req.session.userName;
    res.redirect(303, '/');
});

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});
