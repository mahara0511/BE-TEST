const { Request, Response } = require('express');
const { OK, Created } = require('../helpers/successResponse');
const productService = require('../services/productServices');
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
                    message: 'Not Found',
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
}

module.exports = ProductController;
