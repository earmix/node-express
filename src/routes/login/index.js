const express = require('express');
const { main } = require('./controller');

const router = express.Router();

router.post('/', main);

module.exports = router;