const User = require('../../db/models/UserModel');
const Group = require('../../db/models/GroupModel');
const Bill = require('../../db/models/BillModel');

const addExpenseHandler = (msg, callback) => {
  console.log('Inside add expense');
  console.log(msg);
  const res = {};
  User.findById(msg.userId)
    .then((user) => {
      Group.findOne({ groupName: msg.groupName })
        .then((group) => {
          console.log(group.members);
          Bill.create({
            description: msg.description,
            billAmount: msg.billAmount,
            paidBy: user._id,
            group: group._id,
            participants: {
              users: group.members,
              splitAmount: msg.billAmount / group.members.length,
            },
          }, async (err, bill) => {
            if (bill) {
              console.log(bill);
              await group.bills.push(bill._id);
              await group.save();
              res.status = 200;
              res.data = 'BILL_CREATED';
              callback(null, res);
            } else {
              console.log(err);
              res.status = 201;
              res.data = err;
              callback(null, res);
            }
          });
        }).catch((e) => {
          console.log(e);
          res.status = 500;
          res.data = e;
          callback(null, res);
        });
    })
    .catch((e) => {
      console.log(e);
      res.status = 500;
      res.data = e;
      callback(null, res);
    });
};

exports.addExpenseHandler = addExpenseHandler;
