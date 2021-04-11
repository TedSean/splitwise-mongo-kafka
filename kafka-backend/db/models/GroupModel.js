const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupsSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  groupImage: {
    type: String,
    default: 'https://splitwise-imagestore.s3-us-west-2.amazonaws.com/groupImages/groupPlaceholder.png',
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  bills: [{
    type: Schema.Types.ObjectId,
    ref: 'bill',
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('group', groupsSchema);
