const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  language: {
    type: String,
    default: 'en',
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
    required: true,
  },
  timezone: {
    type: String,
    default: 'Americas/Los_Angeles',
    required: true,
  },
  image: {
    type: String,
    default: 'https://splitwise-imagestore.s3-us-west-2.amazonaws.com/userImages/userPlaceholder.png',
  },
  invitations: [Schema.Types.ObjectId],
  memberships: [Schema.Types.ObjectId],
  bills: [Schema.Types.ObjectId],
},
{
  versionKey: false,
});

const userModel = mongoose.model('user', usersSchema);
module.exports = userModel;
