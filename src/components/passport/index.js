const passport = require('passport');
const LocalStrategy = require('passport-local');
const Users = require('../../models/users');

const findUser = async (username, password, done) => {
  try {
    // User credentials query.
    const q = { username: username, active: true }

    // Query user from database.
    const user = await Users.findOne(q);

    // Throw an error if query did not match an account.
    if (!user || !user.validatePassword(password)) {
      throw new Error('Invalid Credentials');
    }

    // Return user token.
    done(null, user);

  } catch (error) {
    // Return error message.
    done(null, false, { errors: { message: error.message } });
  }
}

const localStrategy = new LocalStrategy({
  usernameField: 'username',
  passwordFiled: 'password'
}, findUser);

passport.use(localStrategy);