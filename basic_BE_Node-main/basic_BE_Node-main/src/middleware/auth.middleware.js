const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../helpers/errorResponse.js");

const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new UnauthorizedError("No token provided");
    }

    jwt.verify(token, process.env.SECRET_KEY || "secret", async (err, member) => {
        if (err) {
            throw new UnauthorizedError("Invalid token");
        }

        req.user = member;
        console.log("User authenticated:", req.user);
        next();
    });
};

export { authenticateToken };
