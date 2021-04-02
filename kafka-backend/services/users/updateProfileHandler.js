const User = require('../../db/models/UserModel');

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
      res.data = {
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        language: updatedUser.language,
        currency: updatedUser.currency,
        timezone: updatedUser.timezone,
        image: updatedUser.image,
        _id: updatedUser._id,
      };
      res.status = 200;
      // res.data = JSON.stringify(updatedUser);
      callback(null, res);
    }
  } catch (e) {
    res.status = 500;
    callback(null, 'error');
  }
};

exports.updateProfileHandler = updateProfileHandler;
