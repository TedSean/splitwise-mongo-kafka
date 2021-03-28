const User = require('../db/models/UserModel');

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
      console.log(e);
      res.status = 400;
      console.log('Kafka Backend : SignUp failed');
      callback(null, 'error');
    }
  }
};

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

function handleRequest(msg, callback) {
  if (msg.path === 'user-signup') {
    delete msg.path;
    signUpHandler(msg, callback);
  } else if (msg.path === 'user-login') {
    delete msg.path;
    loginHandler(msg, callback);
  }
}
exports.handleRequest = handleRequest;
