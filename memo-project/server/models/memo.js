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


memoSchema.statics.create = function (payload) {
  try {
  const memo = new this(payload);
  return memo.save();
  } catch (err){
    return err;
  }
};

memoSchema.statics.findAll = function () {
  return this.find({});
};

memoSchema.statics.findOneByMemoid = function (memoId) {
  return this.findOne({ memoId });
};

memoSchema.statics.updateByMemoid = function (memoId, payload) {
  return this.findOneAndUpdate({ memoId }, payload, { new: true });
};

memoSchema.statics.deleteByMemoid = function (memoId) {
  return this.remove({ memoId });
};

module.exports = mongoose.model('memo', memoSchema);