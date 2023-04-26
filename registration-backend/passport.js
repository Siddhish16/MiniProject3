// const GoogleStrategy = require ("passport-google-oauth20").Strategy;
// const passport = require("passport");

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.CLIENT_ID,
//             clientSecret:process.env.CLIENT_SECRET,
//             callbackURL:"/auth/google/callback",
//             scope: ["profile", "email"],
//         },
//         function (accessToken, refreshToken, profile, callback){
//             callback(null,profile);
//         }
//     )
// );

// passport.serializeUser((user,done) => {
//     done(null,user);
// });

// passport.deserializeUser((user,done) => {
//     done(null,user);
// });


const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"]
    },
    function (accessToken, refreshToken, profile, done) {
      // this function will be called once the user is authenticated successfully
      // you can perform additional actions here, such as saving the user to the database
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports.passportSetup = passportSetup;

