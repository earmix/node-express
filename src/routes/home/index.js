const express = require('express');
const { main, about } = require('./controller');

const router = express.Router();

router.get('/', main);
router.get('/about', about);

module.exports = router;