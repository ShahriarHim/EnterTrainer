const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/userSchema");
const Admin = require("../model/adminSchema");
require("dotenv").config();
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        Admin.findOne({ _id: jwt_payload.id }, function (err, admin) {
          if (err) {
            return done(err, false);
          }
          if (admin) {
            return done(null, admin);
          } else {
            return done(null, false);
          }
        });
      }
    });
  })
);
