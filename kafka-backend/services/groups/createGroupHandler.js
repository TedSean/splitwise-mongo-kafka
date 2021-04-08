/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
const Group = require('../../db/models/GroupModel');
const User = require('../../db/models/UserModel');

const createGroupHandler = async (msg, callback) => {
  const res = {};
  const groupExists = await Group.findOne({ groupName: msg.groupName });
  if (groupExists) {
    res.status = 400;
    callback(null, res);
  } else {
    const group = new Group(msg);
    try {
      await group.save();
      await msg.invitedMembers.map((invitedMemberEmail) => {
        User.findOne({ email: invitedMemberEmail }, async (err, user) => {
          await user.invitations.push(group._id);
          await user.save();
        });
      });
      res.data = JSON.stringify(group);
      res.status = 201;
      callback(null, res);
    } catch (e) {
      res.status = 404;
      callback(null, e);
    }
  }
};

exports.createGroupHandler = createGroupHandler;
