const { Request, Response } = require('express');
const { OK, Created } = require('../helpers/successResponse');

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

    static async getAllProducts(req, res) {}
}

module.exports = ProductController;
