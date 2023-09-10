const mongoose = require("mongoose");

const FilterSchema = mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      unique: true,
    },
    filters: [
      {
        type: new mongoose.Schema(
          {
            name: { type: String, required: true },
            options: [
              {
                type: new mongoose.Schema({
                  description: { type: String, required: true },
                  value: { type: String, required: true },
                }),
              },
            ],
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Filter", FilterSchema);
