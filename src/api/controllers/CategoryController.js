const Category = require("../models/Category");
const { UploadImage } = require("../../utils/cloudinary");

const GetCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(401).json("No Category Found");
      return;
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

const CreateCategory = async (req, res) => {
  try {
    const imageUrl = await UploadImage([], req.body.image, "e-comm", "single");
    if (imageUrl) {
      const newCategory = new Category({
        name: req.body.name,
        secondaryTag: [req.body.secondaryTag],
        image: [imageUrl],
      });
      const savedCategory = await newCategory.save();
      return res.status(201).json(savedCategory);
    }
    return res.status(500).json("Error while uploading image!");
  } catch (error) {
    return res.status(500).json(error);
  }
};

const DeleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const UpdateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const updatedCategory = req.body;

  try {
    const updatedCategoryResult = await Category.findByIdAndUpdate(
      categoryId,
      updatedCategory,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCategoryResult) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategoryResult,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  GetCategories,
  GetCategory,
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
};
