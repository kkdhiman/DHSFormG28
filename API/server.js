const express = require('express')
const app = express()

// Collection app settings from environment
const G28_APP_ENV = process.env['DHS_G28_ENV'] || 'undefined';

// Make configuration settings available as JSON String
let CONFIG = {
    'G28_APP_ENV': G28_APP_ENV
};

app.get('/', (req, res) => res.send(JSON.stringify(CONFIG)));

app.listen(3000, () => console.log('Server listening on port 3000!'))