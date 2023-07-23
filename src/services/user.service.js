"use strict";

const {
    unGetSelectData,
    convertToObjectIdMongodb,
    removeUndefinedObject,
} = require("../utils");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const user = require("../models/user.model");
class UserService {
    static async getAllUser() {
        return await user
            .find({})
            .select(unGetSelectData(["__v", "password"]))
            .lean();
    }
    static async changeStatusUser({ userId }) {
        const foundUser = await user.findById(userId);
        if (!foundUser) {
            throw new NotFoundError("User not exist");
        }
        const { status } = foundUser;
        if (status === "active") {
            foundUser.status = "inactive";
        } else {
            foundUser.status = "active";
        }
        const { modifiedCount } = await foundUser.update(foundUser);
        return modifiedCount;
    }
    static async updateUser({ userId, payload }) {
        const newPayload = removeUndefinedObject(payload);
        return await user.findByIdAndUpdate(userId, newPayload, { new: true });
    }
    static async searchUser({ keySearch }) {
        const regexSearch = new RegExp(keySearch);
        
        const result = await user
            .find(
                {
                    $text: { $search: regexSearch },
                },
                { score: { $meta: "textScore" } }
            )
            .sort({ score: { $meta: "textScore" } })
            .lean();
        return result;
    }
}

module.exports = UserService;
