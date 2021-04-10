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
  paidby: {
    type: Schema.Types.ObjectId,
  },
  participants: [{
    user: Schema.Types.ObjectId,
    splitAmount: Number,
    settled: false,
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('bill', billSchema);
