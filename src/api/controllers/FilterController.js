const Filter = require("../models/Filter");

const GetFilter = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const filter = await Filter.find({ categoryId });
    res.status(200).json(filter);
  } catch (error) {
    res.status(500).json(error);
  }
};

const CreateFilter = async (req, res) => {
  const categoryId = req.params.id;
  const filterData = req.body;

  const existingCategoryData = await Filter.findOne({ categoryId });
  if (existingCategoryData) {
    try {
      const updatedFilter = await Filter.findOneAndUpdate(
        { categoryId: categoryId },
        { $push: { filters: { ...filterData } } },
        { returnOriginal: false }
      );
      return res.status(201).json(updatedFilter);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    const newFilter = new Filter({
      categoryId,
      filters: [{ ...filterData }],
    });

    try {
      const savedFilter = await newFilter.save();
      res.status(201).json(savedFilter);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = { GetFilter, CreateFilter };
