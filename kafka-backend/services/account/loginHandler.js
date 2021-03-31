const User = require('../../db/models/UserModel');

const loginHandler = async (msg, callback) => {
  const res = {};
  try {
    const user = await User.findOne(msg);
    if (!user) {
      res.status = 404;
      callback(null, res);
    } else {
      res.status = 200;
      res.data = JSON.stringify(user);
      callback(null, res);
    }
  } catch (e) {
    res.status = 500;
    callback(null, 'error');
  }
};

exports.loginHandler = loginHandler;
