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
    // http://localhost:3900/api/v1/product/fullTextSearchProducts?name=sneak&description=sneak&category=sneak&brand=sneak
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

    static async fullTestSearchProduct(name, description, brand, category) {
        try {
            let query = 'SELECT * FROM product WHERE';
            let queryParams = [];
            let conditions = [];

            if (name) {
                conditions.push('unaccent(name) % unaccent($1)');
                queryParams.push(description);
            }

            if (description) {
                conditions.push(`unaccent(description) % unaccent($2)`);
                queryParams.push(description);
            }
            if (brand) {
                conditions.push(`unaccent(brand_name) % unaccent($3)`);
                queryParams.push(brand);
            }
            if (category) {
                conditions.push(`unaccent(category) % unaccent($4)`);
                queryParams.push(category);
            }

            if (conditions.length > 0) {
                query += ' ' + conditions.join(' OR ');
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
