"use strict";
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");

const {
    BadRequestError,
    AuthFailureError,
    UnprocessableEntityError,
} = require("../core/error.response");
const { findByEmail } = require("./user.service");
const { createTokenPair } = require("../auth/authUtils");
const KeyTokenService = require("./keyToken.service");
const { getInfoData } = require("../utils");
const userModel = require("../models/user.model");
const { StatusCode } = require("../utils/httpStatusCode");

const userRole = {
    STAFF: "STAFF",
    ADMIN: "ADMIN",
};

class AccessService {
    static handleRefreshToken = async ({ refreshToken, user, keyStore }) => {
        const { userId, email } = user;

        if (keyStore.refreshTokenUsed.includes(refreshToken)) {
            await KeyTokenService.deleteKeyById(userId);
            throw new ForbiddenError(
                "something went wrong !! please login again"
            );
        }

        if (keyStore.refreshToken !== refreshToken) {
            throw new AuthFailureError("shop not register");
        }
        const foundUser = await findByEmail({ email });
        if (!foundUser) throw new AuthFailureError("shop not register");

        //create 1 cap moi
        const tokens = await createTokenPair(
            { userId, email },
            keyStore.publicKey,
            keyStore.privateKey
        );

        await keyStore.update({
            $set: {
                refreshToken: tokens.refreshToken,
            },
            $addToSet: {
                refreshTokenUsed: refreshToken,
            },
        });

        return {
            user,
            tokens,
        };
    };
    static login = async ({ email, password, refreshToken = null }) => {
        const foundUser = await findByEmail({ email });

        if (!foundUser)
            throw new UnprocessableEntityError(
                "Email hoặc password không đúng",
                StatusCode.UNPROCESSABLE_ENTITY,
                { email: "Email hoặc password không đúng" }
            );

        const match = bcrypt.compare(password, foundUser.password);

        if (!match)
            throw new UnprocessableEntityError(
                "Email hoặc password không đúng",
                StatusCode.UNPROCESSABLE_ENTITY,
                { password: "Email hoặc password không đúng" }
            );

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
            user: getInfoData({
                fields: ["_id", "name", "email"],
                object: foundUser,
            }),
            tokens,
        };
    };
    static logout = async ({ keyStore }) => {
        const delKey = await KeyTokenService.removeKeyById(keyStore._id);
        return delKey;
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