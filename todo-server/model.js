const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  something: String,
});

const Something = mongoose.model('Something', todoSchema);
module.exports = Something;