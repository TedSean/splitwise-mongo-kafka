const mongoose = require('mongoose');

const { Schema } = mongoose;

const billSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  billAmount: {
    type: Number,
    required: true,
  },
  group: Schema.Types.ObjectId,
  paidby: Schema.Types.ObjectId,
  participants: {
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
    splitAmount: Number,
    settled: {
      type: Boolean,
      default: false,
    },
  },
  comments: [{
    name: Schema.Types.ObjectId,
    comment: String,
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('bill', billSchema);
