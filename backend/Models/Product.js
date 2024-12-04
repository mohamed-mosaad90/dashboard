const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
  photo: String,
  price: Number,
  Description:String
});

module.exports = mongoose.model('Product', productSchema);
