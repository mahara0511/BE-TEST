const productModel = require('../model/productModel');
class ProductController {
    // [GET] api/v1/product/getAllProducts
    static async getAllProducts(req, res) {
        try {
            const result = await productModel.getAllProducts();

            if (result.success) {
                return res.status(200).json({
                    message: 'Products fetched successfully',
                    data: result.data,
                });
            } else {
                return res.status(500).json({
                    message: result.message,
                    error: result.error,
                });
            }
        } catch (error) {
            console.error('Controller Error:', error.message);
            return res.status(500).json({
                message: 'Unexpected error occurred',
                error: error.message,
            });
        }
    }
    // [GET] api/v1/product/getProducts?category=:category
    static async getProducts(req, res) {
        try {
            const { category } = req.query;

            // Kiểm tra nếu không có category
            if (!category) {
                return res.status(400).json({
                    message: 'Category is required',
                });
            }

            // Gọi model để lấy sản phẩm theo danh mục
            const result = await productModel.getProducts(category);

            // Kiểm tra kết quả từ model
            if (result.success) {
                return res.status(200).json({
                    message: 'Products fetched successfully',
                    data: result.data,
                });
            } else {
                return res.status(400).json({
                    message: result.message,
                    error: result.error,
                });
            }
        } catch (error) {
            console.error('Controller Error:', error.message);
            return res.status(500).json({
                message: 'Unable to fetch products',
                error: error.message,
            });
        }
    }

    // CREATE EXTENSION IF NOT EXISTS pg_trgm;
    // CREATE EXTENSION IF NOT EXISTS unaccent;
    // [GET] api/v1/product/fullTextSearch?text=:text
    static async fullTextSearchProduct(req, res) {
        try {
            const { text } = req.query;

            // Kiểm tra nếu không có tham số text
            if (!text) {
                return res.status(400).json({
                    message: 'Search text is required',
                });
            }

            // Gọi model để tìm kiếm sản phẩm
            const result = await productModel.fullTextSearchProduct(text);

            // Kiểm tra kết quả từ model
            if (result.success) {
                return res.status(200).json({
                    message: 'Search completed successfully',
                    data: result.data,
                });
            } else {
                return res.status(400).json({
                    message: result.message,
                    error: result.error,
                });
            }
        } catch (error) {
            console.error('Controller Error:', error.message);
            return res.status(500).json({
                message: 'Unable to perform full-text search',
                error: error.message,
            });
        }
    }
}

module.exports = ProductController;
