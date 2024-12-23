const dotenv = require("dotenv");
const { Pool } = require("pg");
dotenv.config();

let db;

try {
    db = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false // Allows self-signed certificates, set to true in production for security
        }
    });
} catch (err) {
    console.log("Error in creating pool", err.message);
}


// db.connect()
//     .then(() => console.log("Connected to PostgreSQL"))
//     .catch((err) => {
//         console.error("Connection error", err.stack);
//     });

// setInterval(() => {
//     db.query("SELECT * FROM users");
//     console.log("Query DBS...")
// }, 60000);

module.export = db;