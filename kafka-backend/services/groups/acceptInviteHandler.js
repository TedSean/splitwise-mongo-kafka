const Group = require('../../db/models/GroupModel');
const User = require('../../db/models/UserModel');

const acceptInviteHandler = async (msg, callback) => {
  const res = {};

  Group.findOne({ groupName: msg.groupName })
    .then(async (group) => {
      console.log(group);
      await User.findByIdAndUpdate(msg.userId,
        {
          $pull: { invitations: group._id },
          $push: { memberships: group._id },
        })
        .then((result) => {
          if (result) {
            res.status = 200;
            res.data = 'INVITE_ACCEPTED';
            callback(null, res);
          }
        })
        .catch((e) => {
          console.log(e);
          res.status = 400;
          callback(null, res);
        });
    }).catch((e) => {
      console.log(e);
      res.status = 400;
      callback(null, res);
    });
};

exports.acceptInviteHandler = acceptInviteHandler;
