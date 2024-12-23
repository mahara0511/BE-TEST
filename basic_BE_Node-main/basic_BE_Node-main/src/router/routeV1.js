const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const AccessRoute = require("./access/index.js");
const router = express.Router();


router.get('/', (req, res) => {
    res.send('Hello World!');

});

router.use('/auth', AccessRoute);



module.exports = router;
