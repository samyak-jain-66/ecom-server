const router = require("express").Router();
const { CreateFilter, GetFilter } = require("../controllers/FilterController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

router.post("/create/:id", verifyTokenAndAdmin, CreateFilter);
router.get("/get/:id", GetFilter);

module.exports = router;
