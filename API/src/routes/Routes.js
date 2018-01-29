const express = require('express');
const router = express.Router();

const authenticate = require('../controllers/Authenticate');
const create_account = require('../controllers/CreateAccount');

router.post('/authenticate', authenticate);
router.post('/create-account', create_account);

module.exports = router;