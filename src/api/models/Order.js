const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Ref to User Model
    },

    orders: [
      {
        type: new mongoose.Schema({
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product', // Ref to Product Model
          },
          amount: {
            type: Number,
            required: true,
          },
          orderRating: {
            type: Number,
            default: 0,
          },
          couponUsed: {
            type: Boolean,
          },
          status: {
            type: String,
            required: true,
            default: 'pending',
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
          shippingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Address', // Ref to Address Model
          },
          orderDate: {
            type: Date,
            required: true,
            default: new Date(),
          },
          confirmDate: {
            type: Date,
          },
          deliveredDate: {
            type: Date,
          },
        }),
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
