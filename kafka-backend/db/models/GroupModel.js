const mongoose = require('mongoose');

const { Schema } = mongoose;

const billSchema = require('./BillModel.js').schema;

const groupsSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  groupImage: {
    type: String,
    // required: true,
  },
  owner: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
  bills: [billSchema],
},
{
  versionKey: false,
});

module.exports = mongoose.model('group', groupsSchema);
