const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const {
  CreateAddress,
  GetAddresses,
  GetAddress,
  DeleteAddress,
} = require("../controllers/AddressController");

router.post("/create/:userid", verifyTokenAndAuthorization, CreateAddress);

router.get("/get/:userid", verifyTokenAndAuthorization, GetAddresses);

router.get("/getById/:userid", verifyTokenAndAuthorization, GetAddress);

router.delete("/delete/:userid", verifyTokenAndAuthorization, DeleteAddress);

// router.post("*", SendError);

module.exports = router;
