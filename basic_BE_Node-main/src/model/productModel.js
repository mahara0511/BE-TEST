const db = require('../dbs/initDB.js');

class productModel {
    static async getAllProducts() {
        try {
            // Thực hiện truy vấn để lấy tất cả sản phẩm
            const result = await db.query('SELECT * FROM product');
            return result.rows; // Trả về danh sách sản phẩm
        } catch (error) {
            // Ghi log lỗi nếu xảy ra
            console.error('Error fetching products:', error.message);
            throw new Error('Unable to fetch products'); // Tùy chỉnh thông báo lỗi
        }
    }

    static async getProducts(category) {
        try {
            // Thực hiện truy vấn để lấy tất cả sản phẩm
            const result = await db.query('SELECT * FROM product');
            return result.rows; // Trả về danh sách sản phẩm
        } catch (error) {
            // Ghi log lỗi nếu xảy ra
            console.error('Error fetching products:', error.message);
            throw new Error('Unable to fetch products'); // Tùy chỉnh thông báo lỗi
        }
    }
}

module.exports = productModel;
