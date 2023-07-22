"use strict";

const { unGetSelectData, convertToObjectIdMongodb } = require("../utils");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const user = require("../models/user.model");
class UserService {
    static async getAllUser() {
        return await user
            .find({})
            .select(unGetSelectData(["__v", "password"]))
            .lean();
    }
}

module.exports = UserService;
