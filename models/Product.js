const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  sku: String,
  isFavorite: Boolean,
  quantity: Number,
  productName: String,
  description: String,
  imageUrl: [{
    path: String,
  }],
});

module.exports = mongoose.model("Product", productSchema);
