const express = require('express');
const router = express.Router();

const authenticate = require('../controllers/Authenticate');

router.post('/authenticate', authenticate);

module.exports = router;