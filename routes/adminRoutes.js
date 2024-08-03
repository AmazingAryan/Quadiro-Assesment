const express = require('express');
const { adminLogin } = require('../controllers/adminController');
const router = express.Router();

router.post('/login', adminLogin);

module.exports = router;

const { authMiddleware } = require('../middlewares/authMiddleware');
const { createCar, getCars, updateCar, deleteCar } = require('../controllers/adminController');

router.post('/cars', authMiddleware, createCar);
router.get('/cars', authMiddleware, getCars);
router.put('/cars/:id', authMiddleware, updateCar);
router.delete('/cars/:id', authMiddleware, deleteCar);

module.exports = router;

const { getDashboard } = require('../controllers/adminController');

router.get('/dashboard', authMiddleware, getDashboard);

module.exports = router;