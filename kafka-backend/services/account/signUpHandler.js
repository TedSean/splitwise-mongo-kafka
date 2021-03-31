const User = require('../../db/models/UserModel');

const signUpHandler = async (msg, callback) => {
  const res = {};
  const userExists = await User.findOne(msg);
  if (userExists) {
    res.status = 404;
    callback(null, res);
  } else {
    const user = new User(msg);
    try {
      await user.save();
      res.data = JSON.stringify(user);
      res.status = 201;
      callback(null, res);
    } catch (e) {
      // console.log(e);
      res.status = 400;
      // console.log('Kafka Backend : SignUp failed');
      callback(null, e);
    }
  }
};

exports.signUpHandler = signUpHandler;
