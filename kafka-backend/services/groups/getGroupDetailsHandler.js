const User = require('../../db/models/UserModel');
const Group = require('../../db/models/GroupModel');

const getGroupDetailsHandler = (msg, callback) => {
  const res = {};
  console.log(`MSG: ${JSON.stringify(msg)}`);
  console.log(`MSG: ${JSON.stringify(msg.params)}`);
  User.findById(msg.userId)
    .then((user) => {
      console.log(user);
      Group.findOne({ groupName: msg.params })
        .populate({ path: 'members', select: 'name -_id image' })
        .populate('bills')
        .exec((err, group) => {
          console.log('Here 1');
          console.log(group);
          if (group) {
            console.log('Here 2');
            res.data = {
              groupName: group.groupName,
              groupImage: group.groupImage,
              members: group.members,
              bills: group.bills,
            };
            console.log(`Members: ${group.members}`);
            console.log(`Res: ${JSON.stringify(res)}`);
            console.log('Here 3');
            res.status = 200;
            console.log('Here 4');
            callback(null, res);
          } else if (err) {
            res.status = 201;
            res.data = err;
            callback(null, res);
          }
        });
    })
    .catch((e) => {
      res.status = 500;
      callback(null, e);
    });
};

exports.getGroupDetailsHandler = getGroupDetailsHandler;
