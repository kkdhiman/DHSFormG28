const express = require('express')
const app = express()

// Collection app settings from environment
const G28_APP_ENV = process.env['DHS_G28_ENV'] || 'undefined';

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
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', (req, res) => res.send(JSON.stringify(CONFIG)));

app.listen(3000, () => console.log('Configuration Server listening on port 3000!'))