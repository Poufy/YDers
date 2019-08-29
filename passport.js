const LocalStrategy = require("passport-local").Strategy;
const User = require("./api/models/User");
const bcrypt = require("bcryptjs");

module.exports = passport => {
  // Local Strategy

  passport.use(
    new LocalStrategy(function(username, password, done) {
      //Match Username
      let query = { username: username }; //Setting up the mongodb query
      User.findOne(query, (err, user) => {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: "No User Found" });
        }

        // Match Password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Wrong Password" });
          }
        });
      });
    })
  );

  //Don't ask me what this done. But if you know let me know too.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
