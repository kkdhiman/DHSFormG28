const express = require('express');
const routes = require('./routes/Routes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

// Collection app settings from environment
const G28_APP_ENV = process.env['DHS_G28_ENV'] || 'DEV';

// Database Connection Params that must be set or or don't start the server
const PGDATABASE = process.env['PGDATABASE'];
const PGHOST = process.env['PGHOST'];
const PGPASSWORD = process.env['PGPASSWORD'];
const PGPORT = process.env['PGPORT'];
const PGUSER = process.env['PGUSER'];

let problemConfig = false;

if (PGDATABASE === null || PGDATABASE === undefined) {
    console.log('*** PGDATABASE is not set.');
    problemConfig = true;
}

if (PGHOST === null || PGHOST === undefined) {
    console.log('*** PGHOST is not set');
    problemConfig = true;
}

if (PGPASSWORD === null || PGPASSWORD === undefined) {
    console.log('*** PGPASSWORD is not set');
    problemConfig = true;
}

if (PGPORT === null || PGPORT === undefined) {
    console.log('*** PGPORT is not set');
    problemConfig = true;
}

if (PGUSER === null || PGUSER === undefined) {
    console.log('*** PGUSER is not set');
    problemConfig = true;
}

if (problemConfig) {
    console.log('!! Critical database configuration settings not set.  Exiting.');
    process.exit();
}

// Make configuration settings available as JSON String
let CONFIG = {
    'DHS_G28_ENV': G28_APP_ENV
};

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', (req, res) => res.send(JSON.stringify(CONFIG)));
app.use('/user', routes);

app.listen(3000, () => console.log('Configuration Server listening on port 3000!'))