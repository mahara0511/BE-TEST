const express = require('express');
const ProductController = require('../../controllers/productController.js');
const router = express.Router();

// [GET] api/v1/product/getAllProducts
router.get('/getAllProducts', ProductController.getAllProducts);
router.get('/getProducts', ProductController.getProducts);
router.get('/', (req, res) => {
    res.json({ message: 'Product router' });
});

module.exports = router;
