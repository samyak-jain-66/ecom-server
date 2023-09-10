const Bag = require("../models/Bag");

const GetBagDetails = async (req, res) => {
  const userId = req.params.userid;
  try {
    const bag = await Bag.find({ userId }).populate({
      path: "items",
      populate: [
        {
          path: "productId",
          model: "Product",
        },
      ],
    });
    res.status(200).json(bag);
  } catch (error) {
    res.status(500).json(error);
  }
};

const AddToBag = async (req, res) => {
  const userId = req.params.userid;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const existingUserBag = await Bag.findOne({ userId });
  if (existingUserBag) {
    // Update Bag
    const itemData = {
      productId,
      quantity,
    };
    try {
      const updatedCart = await Bag.findOneAndUpdate(
        { userId: userId },
        { $push: { items: itemData } },
        { returnOriginal: false }
      );
      return res.status(201).json(updatedCart);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    const newBag = new Bag({
      userId,
      items: [{ quantity, productId: productId }],
    });
    try {
      const savedBag = await newBag.save();
      res.status(201).json(savedBag);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

const UpdateBag = async (req, res) => {
  const productId = req.body.productId;
  const userid = req.params.userid;
  const quantity = req.body.quantity;
  try {
    const cart = await Bag.findOne({ userId: userid });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Find the item in the cart items array
    const itemIndex = cart.items.findIndex((item) => {
      return item.productId.equals(productId);
    });
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    // Update the item in the cart

    try {
      const updatedCart = await cart.items.find((p) => {
        return p.productId.equals(productId);
      });

      updatedCart.quantity = quantity;

      const up = await cart.save();
      return res.status(201).json(up);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const RemoveFromBag = async (req, res) => {
  const productId = req.query.pid;
  const userid = req.params.userid;
  try {
    const cart = await Bag.findOne({ userId: userid });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Find the item in the cart items array
    const itemIndex = cart.items.findIndex((item) => {
      return item.productId.equals(productId);
    });
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    // Remove the item from the cart items array
    cart.items.splice(itemIndex, 1);
    // Save the updated cart document
    await cart.save();
    res.status(204).json({ message: "Item Removed" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const ClearBag = async (req, res) => {
  const userid = req.params.userid;
  try {
    const cart = await Bag.findOne({ userId: userid });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    await Bag.deleteOne({ userId: userid });
    return res.status(204).json({ message: "Item Removed" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  GetBagDetails,
  AddToBag,
  RemoveFromBag,
  ClearBag,
  UpdateBag,
};
