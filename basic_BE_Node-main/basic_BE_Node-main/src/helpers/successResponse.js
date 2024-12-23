const { Response } = require("express");
class SuccessResponse {
    message;
    status;
    data;

    constructor({ message, status = 200, reason = "OK", data }) {
        this.message = message || reason;
        this.status = status;
        this.data = data;
    }

    send(res) {
        res.status(this.status).json({
            status: this.status,
            message: this.message,
            data: this.data
        });
    }
}

class OK extends SuccessResponse {
    constructor({ message, data }) {
        super({ message, status: 200, reason: "OK", data });
    }
}

class Created extends SuccessResponse {
    constructor({ message, data }) {
        super({ message, status: 201, reason: "Created", data });
    }
}

export { SuccessResponse, OK, Created };
