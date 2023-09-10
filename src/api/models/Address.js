const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    addresses: [
      {
        type: new mongoose.Schema(
          {
            addressType: { type: String, required: true },
            addressLine1: { type: String, required: true },
            addressLine2: { type: String },
            city: { type: String },
            district: { type: String },
            state: { type: String },
            pincode: { type: Number, required: true },
            phone: { type: Number, required: true },
            name: { type: String, required: true },
            defaultAddress: { type: Boolean },
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
