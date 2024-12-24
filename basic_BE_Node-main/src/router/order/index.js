const express = require('express');
const OrderController = require('../../controllers/orderController.js');
const router = express.Router();

router.post('/create', OrderController.createOrder);

module.exports = router;
