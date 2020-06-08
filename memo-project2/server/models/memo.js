const mongoose = require('mongoose');

const memoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: false }
},
{
  timestamps: true,
  collection: 'memos'
}, );

memoSchema.statics.findAll = function () {
  return this.find({});
};

memoSchema.statics.create = function (payload) {
  try {
  const memo = new this(payload);
  return memo.save();
  } catch (err){
    return err;
  }
};

module.exports = module.exports = mongoose.model('memo', memoSchema);
