const express = require('express');
const ProductController = require('../../controllers/productController.js');
const router = express.Router();

router.get('/getAllProducts', ProductController.getAllProducts);
router.get('/getProducts', ProductController.getProducts);
router.get('/fullTextSearchProducts', ProductController.fullTextSearchProduct);
router.get('/', (req, res) => {
    res.json({ message: 'Product router' });
});

module.exports = router;
