const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const {
  GetComments,
  CreateComment,
} = require("../controllers/CommentController");

router.get("/get/:productId", GetComments);
router.post(
  "/create/:productId/:userid",
  verifyTokenAndAuthorization,
  CreateComment
);

module.exports = router;
