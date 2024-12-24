const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const AccessRoute = require('./access/index.js');
const ProductRoute = require('./product/index.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/product', ProductRoute);
router.use('/auth', AccessRoute);

module.exports = router;
