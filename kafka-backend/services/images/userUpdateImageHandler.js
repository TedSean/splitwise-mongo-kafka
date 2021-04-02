const User = require('../../db/models/UserModel');

const userUpdateImageHandler = async (msg, callback) => {
  const res = {};
  try {
    // console.log(`msg UserId : ${msg.UserId}`);
    const user = await User.findById(msg.userId);
    if (!user) {
      res.status = 404;
      callback(null, res);
    } else {
      user.image = msg.fileUrl;
      user.save((saveError) => {
        if (saveError) {
          res.status = 500;
          res.message = 'Error in Data';
        } else {
          const userObject = {
            avatarURL: user.image,
          };
          res.status = 200;
          res.message = userObject;
        }
        callback(null, res);
      });
    }
  } catch (e) {
    res.status = 500;
    callback(null, 'error');
  }
};

exports.userUpdateImageHandler = userUpdateImageHandler;
