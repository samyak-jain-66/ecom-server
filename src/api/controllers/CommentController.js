const Comment = require("../models/Comment");

const GetComments = async (req, res) => {
  const productId = req.params.productId;
  try {
    const comments = await Comment.find({ productId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

const CreateComment = async (req, res) => {
  const productId = req.params.productId;
  const commentData = req.body;
  const existingProductComment = await Comment.findOne({ productId });
  if (existingProductComment) {
    // Update Comments
    try {
      const updatedComment = await Comment.findOneAndUpdate(
        { productId: productId },
        { $push: { comments: commentData } },
        { returnOriginal: false }
      );
      return res.status(201).json(updatedComment);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    const newComment = new Comment({
      productId,
      comments: [{ ...commentData }],
    });
    try {
      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = { GetComments, CreateComment };
