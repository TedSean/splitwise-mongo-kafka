/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const config = require('./config');
const kafka = require('../kafka/client');

// Setup work and export for the JWT passport strategy
function auth() {
  // console.log('Inside auth');
  const opts = {
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwtPayload, callback) => {
      // console.log(`jwtPayload: ${JSON.stringify(jwtPayload)}`);
      // console.log(`jwtPayload id: ${jwtPayload._id}`);
      const msg = {};
      msg.userId = jwtPayload._id;
      // console.log('msg in backend: ');
      // console.log(msg);
      kafka.makeRequest('passport', msg, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
