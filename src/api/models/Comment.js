const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    comments: [
      {
        type: new mongoose.Schema(
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              required: true,
              ref: "User",
            },
            username: { type: String, required: true },
            headline: { type: String, required: true },
            review: { type: String, required: true },
            rating: { type: Number, default: 3 },
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
