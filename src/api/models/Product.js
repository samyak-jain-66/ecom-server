const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    name: { type: String, required: true, trim: true },
    brand: { type: String, trim: true },
    model: { type: String, trim: true },
    instock: { type: Boolean },
    quantity: { type: Number, required: true },
    image: {
      primary: {
        type: String,
        required: true,
      },
      secondary1: {
        type: String,
      },
      secondary2: {
        type: String,
      },
      secondary3: {
        type: String,
      },
    },
    price: { type: Number, required: true },
    discount_price: { type: Number, default: 0 },
    discount_percentage: { type: Number },
    commentsId: { type: mongoose.Schema.Types.ObjectId },
    relatedItems: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    description: { type: String, required: true },
    rating: { type: Number, default: 3 },
    primaryTag: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
