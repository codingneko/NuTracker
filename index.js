//import Node stuff
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');

//Import mongoose
const mongoose = require('mongoose');
const Session = require('./models/Session');

//Import .env vars
require('dotenv').config({
    silent:true
});

//Import Express
const express = require('express');
const app = express();
app.locals.port = process.env.PORT || 80;

//Set view engine
app.set('view engine', 'pug');

//trust first proxy
app.set('trust proxy', 1);

//Import route controllers
const controllers = require('./controllers/index');

//Define domain name
app.locals.base_url = process.env.BASEURL || 'http://localhost';

//Connect to mongodb
mongoose.connect(
    process.env.MONGO_CONNECTION_STRING, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to Mongo DB')
);

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
    secret: process.env.SESSION_SECRET || '83BAQ6IAW5BYlVBYOrvD',
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

app.get('/user/:user/nut', controllers.front.users.nut);

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

// ENDPOINT: Query user nuts
app.get('/api/user/:user/:count?/:from?/:to?', controllers.api.users.user);

// ENDPOINT: Register new users
app.post('/api/register', controllers.api.users.register);

// ENDPOINT: Login existing users
app.post('/api/login', controllers.api.users.login);

// ENDPOINT: Logout
app.post('/api/logout', controllers.api.users.logout);

// ENDPOINT: Create nuts
app.post('/api/nut/:user', controllers.api.nuts.create);


setInterval(async () => {
    Session.deleteMany({
        expiry: {
            $lte: Date.now()
        }
    });
    console.log("Terminating expired sessions...");
}, 60*1000);

process.on('SIGINT', async () => {
    await Session.deleteMany();
    console.log("Terminating all sessions before exiting...");
    process.exit();
});

//Start the web server
app.listen(app.locals.port, () => {
    console.log(`NuTracker listening at http://localhost:${app.locals.port}`)
});