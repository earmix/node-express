const { appName } = require('../../config');

exports.main = (req, res) => {
  res.status(200).send(appName);
}

exports.about = (req, res) => {
  res.status(200).send('This is the about page.');
}
