const router = require('express').Router();
const { RegisterUser, LoginUser } = require('../controllers/AuthController');

// New User Registration
router.post('/register', RegisterUser);

// Login already existing user
router.post('/login', LoginUser);

module.exports = router;
