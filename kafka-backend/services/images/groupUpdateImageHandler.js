const Group = require('../../db/models/GroupModel');

const groupUpdateImageHandler = async (msg, callback) => {
  const res = {};
  try {
    // console.log(`msg GroupName : ${msg.groupName}`);
    const group = await Group.findOne({ name: msg.groupName });
    if (!group) {
      res.status = 404;
      callback(null, res);
    } else {
      group.image = msg.fileUrl;
      group.save((saveError) => {
        if (saveError) {
          res.status = 500;
          res.message = 'Error in Data';
        } else {
          const userObject = {
            groupImageURL: group.image,
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

exports.groupUpdateImageHandler = groupUpdateImageHandler;
