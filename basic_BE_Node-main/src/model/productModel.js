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

    static async fullTestSearchProduct(text) {
        try {
            let query =
                'SELECT * FROM product WHERE unaccent(name) % unaccent($1) OR unaccent(description) % unaccent($1) OR unaccent(brand_name) % unaccent($1) OR unaccent(category) % unaccent($1)';
            let queryParams = [];

            if (text) {
                queryParams.push(text);
                const result = await db.query(query, queryParams);
                return result.rows;
            } else {
                throw new Error('No search parameter provide');
            }
        } catch (error) {
            throw new Error('Error fetching products: ' + error.message);
        }
    }
}

module.exports = productModel;
