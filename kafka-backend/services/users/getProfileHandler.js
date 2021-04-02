const User = require('../../db/models/UserModel');

const getProfileHandler = async (msg, callback) => {
  const res = {};
  try {
    // console.log(`getProfileHandler msg : ${JSON.stringify(msg)}`);
    const user = await User.findById(msg.userId);
    // console.log(`User: ${JSON.stringify(user)}`);
    if (!user) {
      res.status = 404;
      callback(null, res);
    } else {
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
      res.status = 200;
      // res.data = JSON.stringify(user);
      callback(null, res);
    }
  } catch (e) {
    res.status = 500;
    callback(null, 'error');
  }
};

exports.getProfileHandler = getProfileHandler;
