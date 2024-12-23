const express = require('express');
const cors = require('cors');
const router = require('./router/routeV1.js');
const configEnv = require('./configs/configEnv.js');
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3900;


app.use(
    cors({
        origin: true, // This is a security issue, allowing all origins
        credentials: true, // This allows cookies to be sent/received
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/v1', router);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});