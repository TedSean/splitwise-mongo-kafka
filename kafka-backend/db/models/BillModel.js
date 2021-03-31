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
  price: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  paid_list: [{
    user: mongoose.Schema.Types.ObjectId,
    price: Number,
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('Bill', billSchema);
