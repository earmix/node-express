const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { registerEvents } = require('./events');

const Schema = mongoose.Schema;

const schemaOption = {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
  versionKey: false,
  id: false
};

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  location: { type: String, required: () => { return this.type === 'assistant'; } },
  hash: { type: String, required: false },
  salt: { type: String, required: false },
  type: { type: String, required: true, default: 'assistant', enum: ['assistant', 'librarian', 'chief', 'admin'] },
  active: { type: Boolean, required: true, default: true }
}, schemaOption);

UserSchema
  .virtual('password')
  .set( (password) => {
    this.set('salt', crypto.randomBytes(16).toString('hex'));
    this.set('hash', crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex'));
  });

UserSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = (password) => {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = () => {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 1);

  return jwt.sign({
    id: this._id,
    permissions: this.type,
    location: this.location,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, config.jwtSecret);
};

UserSchema.methods.toAuthJSON = () => {
  return {
    token: this.generateJWT()
  };
};

// UserSchema.post('save', function (doc) {

// });

// UserSchema.post('remove', function (doc) {

// });

registerEvents(UserSchema);
module.exports = mongoose.model('User', UserSchema);