var express = require('express');
var router = express.Router();

var authenticate = require('../controllers/Authenticate');

router.post('/authenticate', authenticate);

module.exports = router;