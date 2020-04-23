const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add route
app.use('/', require('./routes/home'));

module.exports = app;