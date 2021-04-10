const mongoose = require('mongoose');

const { Schema } = mongoose;

const bill = require('./BillModel.js').schema;

const groupsSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  groupImage: {
    type: String,
    default: 'https://splitwise-imagestore.s3-us-west-2.amazonaws.com/groupImages/groupPlaceholder.png',
  },
  members: [Schema.Types.ObjectId],
  bills: [bill],
},
{
  versionKey: false,
});

module.exports = mongoose.model('group', groupsSchema);
