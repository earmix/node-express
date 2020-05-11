//Require dotenv
require('dotenv').config()

// Place environment variables here...
const variables = {
  mongoUri:  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/test',
  jwtSecret: process.env.JWT_TOKEN || 'this_is_the_jwt_token',
  appName: 'ExpressJS'
}

// Export variable to other components
module.exports = variables;