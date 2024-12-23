const AccessService = require("../services/accessServices");
const { Request, Response } = require("express");
const { OK, Created } = require("../helpers/successResponse");

class AccessController {
    static async SignUp(req, res) {
        console.log("AccessController::SignUp", req.body);

        return new Created({
            message: "User created successfully",
            data: await AccessService.SignUp({
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            })
        }).send(res);
    }

    static async SignIn(req, res) {
        const { email, password } = req.body;
        console.log("AccessController::SignIn", req.body);
        const data = await AccessService.login(email, password);
        res.cookie("token", data.accessToken, { httpOnly: true, secure: true, sameSite: "none" });
        return new OK({
            message: "User signed in successfully",
            data: data
        }).send(res);
    }
}

module.export = AccessController;
