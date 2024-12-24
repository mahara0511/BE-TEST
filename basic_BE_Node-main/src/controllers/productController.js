const { Request, Response } = require('express');
const { OK, Created } = require('../helpers/successResponse');
const productService = require('../services/productServices');
const productModel = require('../model/productModel');
class ProductController {
    static async SignIn(req, res) {
        const { email, password } = req.body;
        console.log('AccessController::SignIn', req.body);
        const data = await AccessService.login(email, password);
        res.cookie('token', data.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return new OK({
            message: 'User signed in successfully',
            data: data,
        }).send(res);
    }

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
}

module.exports = ProductController;
