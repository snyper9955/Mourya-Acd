const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails } = profile;
      const email = emails[0].value;

      try {
        let user = await User.findOne({ googleId: id });

        if (!user) {
          // Check if user exists with the same email
          user = await User.findOne({ email });

          if (user) {
            // Update existing user with googleId
            user.googleId = id;
            await user.save();
          } else {
            // Create new user
            const userCount = await User.countDocuments();
            const role = userCount === 0 ? 'admin' : 'student';

            user = await User.create({
              name: displayName,
              email,
              googleId: id,
              role,
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// We don't need serialize/deserialize if we are using JWT, 
// but passport might expect it if we don't explicitly disable sessions.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
