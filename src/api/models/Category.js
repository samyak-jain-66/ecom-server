const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: [
      {
        type: String,
      },
    ],
    productsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // ref to Product Model
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
