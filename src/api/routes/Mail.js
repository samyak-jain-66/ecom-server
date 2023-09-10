const router = require("express").Router();
const { SendMail } = require("../controllers/MailController");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.post("/send/:userid", verifyTokenAndAuthorization, SendMail);

module.exports = router;
