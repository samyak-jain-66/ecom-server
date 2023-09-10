const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const { UpdateUser } = require("../controllers/UserController");

// Update user details
router.put("/update/:id", verifyTokenAndAuthorization, UpdateUser);

module.exports = router;
