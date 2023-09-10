const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

const {
  GetBagDetails,
  AddToBag,
  RemoveFromBag,
  ClearBag,
  UpdateBag,
} = require("../controllers/BagController");
const { SendError } = require("../controllers/ErrorController");

router.get("/get/:userid", verifyTokenAndAuthorization, GetBagDetails);
router.post("/addToBag/:userid", verifyTokenAndAuthorization, AddToBag);
router.delete(
  "/removeFromBag/:userid",
  verifyTokenAndAuthorization,
  RemoveFromBag
);
router.put("/updateBag/:userid", verifyTokenAndAuthorization, UpdateBag);
router.delete("/clearBag/:userid", verifyTokenAndAuthorization, ClearBag);

router.post("*", SendError);

module.exports = router;
