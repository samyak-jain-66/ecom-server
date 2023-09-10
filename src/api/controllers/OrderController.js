const Order = require('../models/Order');
const User = require('../models/User');
const mongoose = require('mongoose');
const { service } = require('../axios');
const { GET_ORDER_EMAIL_TEMPLATE } = require('../../constants/constant');

const GetOrders = async (req, res) => {
  const userId = req.params.userid;
  try {
    const orders = await Order.find({ userId })
      .populate({
        path: 'orders',
        populate: [
          {
            path: 'productId',
            model: 'Product',
          },
        ],
      })
      .sort({ 'orders.amount': 1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const GetOrder = async (req, res) => {
  const userId = req.params.userid;
  const orderId = req.query.orderid;

  try {
    const orders = await Order.find(
      {
        userId: userId,
        'orders._id': orderId,
      },
      {
        orders: {
          $elemMatch: {
            _id: mongoose.Types.ObjectId(orderId),
          },
        },
      }
    ).populate({
      path: 'orders',
      populate: [
        {
          path: 'productId',
          model: 'Product',
        },
      ],
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const CreateOrder = async (req, res) => {
  const userId = req.params.userid;
  const orderData = req.body;
  const existingUserOrder = await Order.findOne({ userId });
  const currentDateTime = new Date();

  orderData.forEach((order) => {
    order.orderDate = currentDateTime;
    order.confirmDate = '';
    order.deliveredDate = '';
  });

  if (existingUserOrder) {
    // Update Order
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        { userId: userId },
        { $push: { orders: orderData } },
        { returnOriginal: false }
      );

      const loggedInUser = await User.findOne({ _id: userId });

      const emailData = {
        name: loggedInUser.firstname + ' ' + loggedInUser.lastname,
      };

      const emailContent = {
        email: loggedInUser.email,
        template: GET_ORDER_EMAIL_TEMPLATE(emailData),
      };

      try {
        const sendEmail = await service.post(
          '/mail/send/' + userId,
          emailContent,
          {
            headers: {
              token: 'Bearer ' + req.headers.token.split(' ')[1],
            },
          }
        );
      } catch (error) {
        return res.status(500).json(error);
      }

      return res.status(201).json(updatedOrder);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    const newOrder = new Order({
      userId,
      orders: [...orderData],
    });

    try {
      const savedOrder = await newOrder.save();
      return res.status(201).json(savedOrder);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

const UpdateOrderRating = async (req, res) => {
  const userId = req.params.userid;
  const orderId = req.body.data.orderid;
  const rating = req.body.data.rating;

  try {
    const orders = await Order.updateOne(
      {
        userId: userId,
        'orders._id': orderId,
      },
      // {
      //   orders: {
      //     $elemMatch: {
      //       _id: mongoose.Types.ObjectId(orderId),
      //     },
      //   },
      // },
      { $set: { 'orders.$[elem].orderRating': rating } },
      { arrayFilters: [{ 'elem._id': { $eq: orderId } }] }
    );

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const GetAllOrders = async (req, res) => {
  const orderType = req.params.status || 'pending';
  try {
    const pendingOrders = await Order.aggregate([
      { $unwind: '$orders' },
      { $match: { 'orders.status': orderType } },
      {
        $project: {
          _id: 0,
          userId: 1,
          'orders._id': 1,
          'orders.productId': 1,
          'orders.amount': 1,
          'orders.orderRating': 1,
          'orders.status': 1,
          'orders.quantity': 1,
          'orders.orderDate': 1,
        },
      }, // Project only the required fields
    ]);

    res.status(200).json(pendingOrders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const UpdateOrderStatus = async (req, res) => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;

  const updateDate = () => {
    return newStatus == 'confirmed'
      ? { 'orders.$.confirmDate': new Date() }
      : { 'orders.$.deliveredDate': new Date() };
  };

  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { 'orders._id': orderId },
      { $set: { 'orders.$.status': newStatus, ...updateDate() } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  GetOrders,
  CreateOrder,
  GetOrder,
  UpdateOrderRating,
  GetAllOrders,
  UpdateOrderStatus,
};
