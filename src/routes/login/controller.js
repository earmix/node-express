const passport = require('passport');

exports.main = (req, res, next) => {
  const results = (err, passportUser, info) => {
    // If error exists proceed to next middleware
    if (err) return next(info);

    // If user exists return jwt token;
    if (passportUser) {
      const useraccount = passportUser;
      useraccount.token = passportUser.generateJWT();

      const uuid = passportUser._id;

      if (req.body.redirectURI) {
        return res.redirect(`${req.body.redirectURI}&authorization_code=${uuid}`);
      }

      return res.status(200).json(useraccount.toAuthJSON());
    }

    // If user is unathorized return 401;
    return res.status(401).send(info);
  };

  return passport.authenticate('local', { session: false }, results(err, passportUser, next))(req, res, next);
}
