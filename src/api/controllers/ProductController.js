const Product = require("../models/Product");
const { UploadImage } = require("../../utils/cloudinary");

// @route("{{URL}}/product/get?categoryId=63ff24af586ff01dd43c9b36&tag=bestseller")
const GetProducts = async (req, res) => {
  const { categoryId, tag, brand, type, price: productPrice } = req.query;
  const searchQuery = {};

  if (categoryId) {
    searchQuery.categoryId = categoryId;
  }
  if (tag) {
    searchQuery.secondaryTag = { $in: [tag] };
  }

  if (brand) {
    searchQuery.brand = { $in: brand.split(",") };
  }

  if (type) {
    searchQuery.primaryTag = { $in: type.split(",") };
  }

  if (productPrice) {
    let lowerBound = productPrice.split("_")[0].split(",")[0];
    let upperBound = productPrice.split("_")[1].split(",").slice(-1)[0];

    searchQuery.price = { $gte: lowerBound, $lte: upperBound };
  }

  try {
    const products = await Product.find(searchQuery).populate(
      "categoryId",
      "name"
    );
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Return single product based on Product id received as a param
const GetProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId).populate(
      "categoryId",
      "name"
    );
    if (product) {
      return res.status(201).json(product);
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};

const CreateProduct = async (req, res) => {
  try {
    const imagesUrl = await UploadImage(
      req.body.image,
      "",
      "e-comm",
      "multiple"
    );
    if (imagesUrl) {
      const newProduct = new Product({
        categoryId: req.body.categoryId,
        name: req.body.name,
        brand: req.body.brand,
        instock: req.body.instock,
        quantity: req.body.quantity,
        image: imagesUrl,
        price: req.body.price,
        discount_price: req.body.discount_price,
        discount_percentage: req.body.discount_percentage,
        commentsId: req.body.commentsId,
        relatedItems: req.body.relatedItems,
        description: req.body.description,
        rating: req.body.rating,
        primaryTag: req.body.primaryTag,
      });
      const savedProduct = await newProduct.save();
      return res.status(201).json(savedProduct);
    }
    return res.status(500).json("Error while creating product!");
  } catch (error) {
    res.status(500).json(error);
  }
};

const UpdateProductStock = async (req, res) => {
  const productId = req.params.productId;
  const requestedQuantity = req.body.quantity;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const currentQuantity = product.quantity;

    if (requestedQuantity > currentQuantity) {
      return res.status(400).json({ message: "Insufficient product quantity" });
    }

    // Calculate the new quantity after decreasing
    const newQuantity = currentQuantity - requestedQuantity;

    // Update the product's quantity with the new value
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: { quantity: newQuantity } },
      { new: true }
    );

    res.status(200).json({
      message: "Product quantity updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const UpdateProductDetails = async (req, res) => {
  const productId = req.params.productId;
  const { name, price, quantity } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: { name, price, quantity } },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product details updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  GetProducts,
  CreateProduct,
  GetProduct,
  UpdateProductStock,
  DeleteProduct,
  UpdateProductDetails,
};
