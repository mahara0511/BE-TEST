class ErrorResponse extends Error {
    status;
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message) {
        super(message, 400);
    }
}

class UnauthorizedError extends ErrorResponse {
    constructor(message) {
        super(message, 401);
    }
}

class PaymentRequired extends ErrorResponse {
    constructor(message) {
        super(message, 402);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message) {
        super(message, 404);
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message) {
        super(message, 403);
    }
}

class InternalServerError extends ErrorResponse {
    constructor(message) {
        super(message, 500);
    }
}

module.exports = { ErrorResponse, BadRequestError, UnauthorizedError, NotFoundError, ForbiddenError, InternalServerError, PaymentRequired };
