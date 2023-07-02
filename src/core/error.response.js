"use strict";


const { StatusCode, ReasonStatusCode } = require("../utils/httpStatusCode");
class ErrorResponse extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data
    }
}
class ConflictRequestError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.CONFLICT,
        statusCode = StatusCode.CONFLICT
    ) {
        super(message, statusCode);
    }
}
class UnprocessableEntityError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.UNPROCESSABLE_ENTITY,
        statusCode = StatusCode.UNPROCESSABLE_ENTITY,
        data
    ) {
        super(message, statusCode, data);
    }
}
class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.FORBIDDEN,
        statusCode = StatusCode.FORBIDDEN
    ) {
        super(message, statusCode);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(
        message = ReasonStatusCode.UNAUTHORIZED,
        statusCode = StatusCode.UNAUTHORIZED,
        data
    ) {
        super(message, statusCode, data);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = ReasonStatusCode.NOT_FOUND, statusCode = StatusCode.NOT_FOUND){
        super(message, statusCode);
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN){
        super(message, statusCode);
    }
}
module.exports = {
    ConflictRequestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError,
    ForbiddenError,
    UnprocessableEntityError
};
