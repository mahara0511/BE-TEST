const dotenv = require("dotenv");
dotenv.config();

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT || "3001", 10)
    }
};

const product = {
    app: {
        port: parseInt(process.env.PRODUCT_APP_PORT || "3001", 10)
    }
};



const config = { dev, product };
const env = process.env.NODE_ENV || "dev";

module.export = config[env];
