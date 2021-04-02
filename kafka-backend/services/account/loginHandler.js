const bcrypt = require('bcrypt');
const User = require('../../db/models/UserModel');

const loginHandler = async (msg, callback) => {
  const res = {};
  User
    .findOne({ email: msg.email })
    .then((user) => {
      console.log(user);
      if (!user) {
        res.status = 400;
        callback(null, res);
      } else {
        bcrypt.compare(msg.password, user.password, async (err, match) => {
          console.log(`Match: ${match}`);
          if (err) {
            console.log('in bcrypt error');
            callback(
              null,
              {
                status: 403,
                res: 'BCRYPT_ERROR',
                err,
              },
            );
          }
          if (!match) {
            console.log('in match error');
            callback(null, { status: 403, res: 'INCORRECT_PASSWORD' });
          }
          res.data = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            language: user.language,
            currency: user.currency,
            timezone: user.timezone,
            image: user.image,
            _id: user._id,
          };
          res.status = 200;
          // res.data = JSON.stringify(user);
          callback(null, res);
        });
      }
    }).catch((e) => {
      console.log(e);
    });
};

exports.loginHandler = loginHandler;
