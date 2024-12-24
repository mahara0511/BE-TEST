const db = require('../dbs/initDB.js');

class productModel {
    static async getAllProducts() {
        try {
            const result = await db.query('SELECT * FROM product');
            return {
                success: true,
                data: result.rows,
            };
        } catch (error) {
            console.error('Error fetching products:', error.message);

            // Trả về lỗi dưới dạng đối tượng
            return {
                success: false,
                message: 'Unable to fetch products',
                error: error.message,
            };
        }
    }

    static async getProducts(category) {
        try {
            const query = 'SELECT * FROM product WHERE category = $1';
            const params = [category];
            const result = await db.query(query, params);

            return {
                success: true,
                data: result.rows,
            };
        } catch (error) {
            console.error(
                'Error fetching products by category:',
                error.message
            );
            return {
                success: false,
                message: 'Unable to fetch products by category',
                error: error.message,
            };
        }
    }

    static async fullTextSearchProduct(text) {
        try {
            if (!text) {
                return {
                    success: false,
                    message: 'No search parameter provided',
                    error: null,
                };
            }

            const query =
                'SELECT * FROM product WHERE unaccent(name) % unaccent($1) OR unaccent(description) % unaccent($1) OR unaccent(brand_name) % unaccent($1) OR unaccent(category) % unaccent($1)';
            const queryParams = [text];
            const result = await db.query(query, queryParams);

            return {
                success: true,
                data: result.rows,
            };
        } catch (error) {
            console.error('Error performing full-text search:', error.message);
            return {
                success: false,
                message: 'Error performing full-text search',
                error: error.message,
            };
        }
    }
}

module.exports = productModel;
