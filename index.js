//import Node stuff
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');

//Import Lowapp.locals.db
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const loadashId = require('lodash-id');


//Import Express
const express = require('express');
const app = express();
app.locals.port = 80;

//Set view engine
app.set('view engine', 'pug');

//trust first proxy
app.set('trust proxy', 1);

//Import nanoid
app.locals.nanoid = require('nanoid').nanoid;

//Import route controllers
const controllers = require('./controllers/index');
const user = require('./controllers/api/users/user');

//import crypto
app.locals.crypto = require('crypto');

//Define domain name
const base_url = 'http://localhost';

//Create database
const adapter = new FileSync('db.json');
app.locals.db = low(adapter);
app.locals.db._.mixin(loadashId);

app.locals.db.defaults({
    users: [],
    sessions: [],
    faps: []
}).write();

//register middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sass({
    src: __dirname + '/views/scss',
    dest: __dirname + '/public/css',
    prefix:  '/css',
    debug: true
}));
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: '83BAQ6IAW5BYlVBYOrvD',
    resave: false,
    saveUninitialized: true,

    cookie: { 
        maxAge: 3*1000*60*60*24*30
    }
}));


/**
 * Create Front end endpoints
 */

app.get('/', controllers.front.index);

app.get('/user/:user', controllers.front.users.user);

app.get('/user/:user/fap', controllers.front.users.fap);

app.get('/register', controllers.front.users.register);

app.post('/register/submit', controllers.front.users.registerSubmit);

app.get('/login', controllers.front.users.login);

app.post('/login/submit', controllers.front.users.loginSubmit);

app.get('/privacy', (req, res) => {
    res.render('pages/privacy');
});

/**
 * Create API Endpoints
 *
 */

// ENDPOINT: Query user faps
app.get('/api/user/:user/:count?/:from?/:to?', controllers.api.users.user);

// ENDPOINT: Register new users
app.post('/api/register', controllers.api.users.register);

// ENDPOINT: Login existing users
app.post('/api/login', controllers.api.users.login);

// ENDPOINT: Logout
app.post('/api/logout', controllers.api.users.logout);

// ENDPOINT: Create faps
app.post('/api/fap/:user', controllers.api.faps.create);


setInterval(() => {
    app.locals.db.get('sessions').remove(session => session.expiry < Date.now()).write();
    console.log("Terminating expired sessions...");
}, 60*1000);

process.on('SIGINT', () => {
    app.locals.db.get('sessions').remove().write();
    console.log("Terminating all sessions before exiting...");
    process.exit();
});

//Start the web server
app.listen(app.locals.port, () => {
    console.log(`Fap counter listening at http://localhost:${app.locals.port}`)
});