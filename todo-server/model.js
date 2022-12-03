const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  email: String, // Identifier
  ////
  // for banning purposes
  create: Boolean,
  read: Boolean,
  update: Boolean,
  delete: Boolean,
  ////
  // for administration access
  readOthers: Boolean,
  updateOthers: Boolean,
  deleteOthers: Boolean,
  ////
  // post history
  posts: Array,
});

const User = mongoose.model('User', todoSchema);
module.exports = User;