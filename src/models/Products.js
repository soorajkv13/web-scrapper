// models/products.js
const mongoose = require("mongoose");
const date = Date.now;
const { randomUUID } = require("crypto");
const collection = process.env.MONGO_COLLECTION_WEB_SCRAPPER || 'product'
const productSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => randomUUID() },
    productName: { type: String, required: false },
    productPrice: { type: Number, required: false },
    userRating: { type: Number, required: false },
    numberOfReviews: { type: Number , required: false },
    createdAt: { type: Date, default: date },
  },
  {versionKey: false,}
);

module.exports = mongoose.model(
  collection,
  productSchema,
  collection
);
