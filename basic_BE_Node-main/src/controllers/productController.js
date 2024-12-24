const productModel = require('../model/productModel');
class ProductController {
    // [GET] api/v1/product/getAllProducts
    static async getAllProducts(req, res) {
        try {
            const products = await productModel.getAllProducts();
            return res.status(200).json({
                message: 'Products fetched successfully',
                data: products,
            });
        } catch (error) {
            console.error('Controller Error:', error.message);
            return res.status(500).json({
                message: 'Unable to fetch products',
                error: error.message,
            });
        }
    }
    // [GET] api/v1/product/getProducts?category=:category
    static async getProducts(req, res) {
        try {
            const { category } = req.query;
            if (!category) {
                return res.status(404).json({
                    message: 'Invalid input',
                });
            }
            const products = await productModel.getProducts(category);
            return res.status(200).json({
                message: 'Products fetched successfully',
                data: products,
            });
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
            const products = await productModel.fullTestSearchProduct(text);

            return res.status(200).json({
                message: 'Products fetched successfully',
                data: products,
            });
        } catch (error) {
            console.error('Controller Error:', error.message);
            return res.status(500).json({
                message: 'Unable to fetch products',
                error: error.message,
            });
        }
    }
}

module.exports = ProductController;
