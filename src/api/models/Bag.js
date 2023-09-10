const mongoose = require("mongoose");

const BagSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Ref to User Model
    },
    items: [
      {
        type: new mongoose.Schema(
          {
            productId: {
              // ref to Product Model
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
            quantity: {
              type: Number,
              required: true,
              default: 1,
            },
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bag", BagSchema);
