const router = require("express").Router();
const { SearchProducts } = require("../controllers/SearchController");

router.get("/:term", SearchProducts);

module.exports = router;
