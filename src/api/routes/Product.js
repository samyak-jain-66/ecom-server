const router = require('express').Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const {
  CreateProduct,
  GetProducts,
  GetProduct,
  UpdateProductStock,
  DeleteProduct,
  UpdateProductDetails,
} = require('../controllers/ProductController');

router.post('/create', verifyTokenAndAdmin, CreateProduct);
router.get('/get', GetProducts);
router.get('/get/:id', GetProduct);
router.put('/update/stock/:productId', verifyTokenAndAdmin, UpdateProductStock);
router.delete('/delete/:id', verifyTokenAndAdmin, DeleteProduct);
router.put('/update/:productId', verifyTokenAndAdmin, UpdateProductDetails);

module.exports = router;
