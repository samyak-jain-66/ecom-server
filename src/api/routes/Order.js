const router = require('express').Router();
const {
  GetOrders,
  CreateOrder,
  GetOrder,
  UpdateOrderRating,
  GetAllOrders,
  UpdateOrderStatus,
} = require('../controllers/OrderController');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');

router.post('/create/:userid', verifyTokenAndAuthorization, CreateOrder);

router.get('/get/:userid', verifyTokenAndAuthorization, GetOrders);

router.get('/getById/:userid', verifyTokenAndAuthorization, GetOrder);

router.get('/getAll/:status', verifyTokenAndAdmin, GetAllOrders);

router.put('/update/status/:orderId', verifyTokenAndAdmin, UpdateOrderStatus);

router.post('/update/:userid', verifyTokenAndAuthorization, UpdateOrderRating);

// router.post("*", SendError);

module.exports = router;
