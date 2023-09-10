const router = require('express').Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const {
  GetCategories,
  GetCategory,
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
} = require('../controllers/CategoryController');
const { SendError } = require('../controllers/ErrorController');

router.post('/create', verifyTokenAndAdmin, CreateCategory);

router.get('/get', GetCategories);
router.get('/get/:id', GetCategory);

router.delete('/delete/:id', verifyTokenAndAdmin, DeleteCategory);

router.put('/update/:id', verifyTokenAndAdmin, UpdateCategory);

router.post('*', SendError);

module.exports = router;
