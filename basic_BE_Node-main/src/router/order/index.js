const express = require('express');
const OrderController = require('../../controllers/orderController.js');
const router = express.Router();

router.post('/create', OrderController.createOrder);
router.put('/editStatus', OrderController.editStatus);
module.exports = router;
