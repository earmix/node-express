const { APP_NAME } = require('../../config');

exports.main = (req, res) => {
  res.status(200).send(APP_NAME);
}

exports.about = (req, res) => {
  res.status(200).send('This is the about page.');
}
