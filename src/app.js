const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./components/passport');
require('./components/mongoose');

// Add route
app.use('/', require('./routes/home'));

module.exports = app;