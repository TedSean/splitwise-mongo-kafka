const User = require('../db/models/UserModel');

const passportHandler = async (msg, callback) => {
  const res = {};
  try {
    const { userId } = msg;
    console.log(`User Id : ${userId}`);
    const user = await User.findById(userId);
    // console.log(`User: ${user}`);
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
  passportHandler(msg, callback);
}
exports.handleRequest = handleRequest;
