/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
const User = require('../../db/models/UserModel');

const getAllUsersHandler = async (msg, callback) => {
  const res = {};
  User
    .find({ _id: { $ne: msg.userId } }, { _id: 0, name: 1, email: 1 })
    .then((result) => {
      if (result.length > 0) {
        console.log(result);
        res.status = 200;
        res.data = [...result];
        callback(null, res);
      } else {
        res.status = 404;
        callback(null, res);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.getAllUsersHandler = getAllUsersHandler;
