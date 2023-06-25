"use strict";
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");

const { BadRequestError } = require("../core/error.response");
const { findByEmail } = require("./user.service");
const { createTokenPair } = require("../auth/authUtils");
const KeyTokenService = require("./keyToken.service");
const { getInfoData } = require("../utils");
const userModel = require("../models/user.model");

const userRole = {
    STAFF: "STAFF",
    ADMIN: "ADMIN",
};

class AccessService {
    static login = async ({ email, password, refreshToken = null }) => {
        const foundUser = await findByEmail({ email });

        if (!foundUser) throw new BadRequestError("user not registered");

        const match = bcrypt.compare(password, foundUser.password);

        if (!match) throw new BadRequestError("Authentication error");

        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        const { _id: userId } = foundUser;
        const tokens = await createTokenPair(
            { userId, email },
            publicKey,
            privateKey
        );

        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId,
        });
        return {
            shop: getInfoData({
                fields: ["_id", "name", "email"],
                object: foundShop,
            }),
            tokens,
        };
    };

    static signUp = async ({ name, email, password }) => {
        const holderUser = await userModel.findOne({ email }).lean();

        if (holderUser) throw new BadRequestError("User already registered");

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            name,
            email,
            password: passwordHash,
            roles: [userRole.STAFF],
        });

        if (newUser) {
            const privateKey = crypto.randomBytes(64).toString("hex");
            const publicKey = crypto.randomBytes(64).toString("hex");

            const keyStore = await KeyTokenService.createKeyToken({
                userId: newUser._id,
                publicKey,
                privateKey,
            });

            if (!keyStore) throw new BadRequestError("publicKey error");

            const tokens = await createTokenPair(
                { userId: newUser._id, email },
                publicKey,
                privateKey
            );
            return {
                code: 201,
                metadata: {
                    user: getInfoData({
                        fields: ["_id", "name", "email"],
                        object: newUser,
                    }),
                    tokens,
                },
            };
        }
    };
}
module.exports = AccessService;
