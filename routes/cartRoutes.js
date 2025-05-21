const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const { CreateCart ,UpdateCart} = require('../controllers/cartController');
const authCart = require('../middlewares/cartMiddleware');

router.post('/', protect, CreateCart);
router.put('/:id', protect, authCart, UpdateCart);

module.exports = router;
