const mongoose = require('mongoose');
const { mongoUri } = require('../../config');

mongoose.promise = global.Promise;

mongoose.connect(mongoUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.set('debug', false);

mongoose.connection.on('error', () => {
  console.error.bind(console, 'connection error:')
});

mongoose.connection.once('open', () => {
  console.log('Database ready...');
});