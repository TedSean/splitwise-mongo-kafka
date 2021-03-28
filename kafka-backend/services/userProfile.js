const User = require('../db/models/UserModel');

const getProfileHandler = async (msg, callback) => {
  const res = {};
  try {
    console.log(`getProfileHandler msg : ${JSON.stringify(msg)}`);
    const user = await User.findOne({ email: msg.params });
    console.log(`User: ${JSON.stringify(user)}`);
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

const updateProfileHandler = async (msg, callback) => {
  const res = {};
  try {
    const oldUser = await User.findOne({ email: msg.email });
    if (!oldUser) {
      res.status = 404;
      callback(null, res);
    } else {
      const filter = ({ email: msg.email });
      const update = {
        name: msg.name ? msg.name : oldUser.name,
        email: msg.email ? msg.email : oldUser.email,
        phone: msg.phone ? msg.phone : oldUser.phone,
        currency: msg.currency ? msg.currency : oldUser.currency,
        language: msg.language ? msg.language : oldUser.language,
        timezone: msg.timezone ? msg.timezone : oldUser.timezone,
      };
      const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
        useFindAndModify: true,
      });
      res.status = 200;
      res.data = JSON.stringify(updatedUser);
      callback(null, res);
    }
  } catch (e) {
    res.status = 500;
    callback(null, 'error');
  }
};

const updateProfileImageHandler = async (msg, callback) => {
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
  if (msg.path === 'user-get-profile') {
    delete msg.path;
    getProfileHandler(msg, callback);
  } else if (msg.path === 'user-update-profile') {
    delete msg.path;
    updateProfileHandler(msg, callback);
  } else if (msg.path === 'user-update-profile-image') {
    delete msg.path;
    updateProfileImageHandler(msg, callback);
  }
}
exports.handleRequest = handleRequest;
