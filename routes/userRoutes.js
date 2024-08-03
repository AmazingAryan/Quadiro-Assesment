const express = require('express');
const { userLogin, createUser } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getCars } = require('../controllers/adminController');
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
router.get('/cars', authMiddleware, getCars);

module.exports = router;
