const Product = require("../models/Product");

const SearchProducts = async (req, res) => {
  try {
    const term = req.params.term;
    const products = await Product.find({
      $or: [
        { name: { $regex: term, $options: "i" } },
        { brand: { $regex: term, $options: "i" } },
      ],
    }).populate("categoryId", "name");
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { SearchProducts };
