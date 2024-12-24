const db = require('../dbs/initDB.js');

class productModel {
    static async getAllProducts() {
        try {
            const result = await db.query('SELECT * FROM product');
            return result.rows;
        } catch (error) {
            console.error('Error fetching products:', error.message);
            throw new Error('Unable to fetch products');
        }
    }

    static async getProducts(category) {
        try {
            let query = 'SELECT * FROM product WHERE category = $1';
            const param = [category];
            const result = await db.query(query, param);
            console.log(result.rows);
            return result.rows;
        } catch (error) {
            console.error('Error fetching products:', error.message);
            throw new Error('Unable to fetch products');
        }
    }
}

module.exports = productModel;
