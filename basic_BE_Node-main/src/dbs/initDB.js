const dotenv = require('dotenv');
const result = dotenv.config();

const { Pool } = require('pg');

let db;

try {
    console.log(process.env.DB_HOST);
    db = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432, // Nếu không có cổng trong .env, sẽ dùng cổng mặc định
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: false },
    });
} catch (err) {
    console.log('Error in creating pool', err.message);
}

db.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => {
        console.error('Connection error', err.stack);
    });

module.exports = db;
