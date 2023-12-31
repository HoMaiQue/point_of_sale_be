"use strict";

"use strict";

const { Created, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
    signUp = async (req, res, next) => {
        new Created({
            message: "Register Ok",
            metaData: await AccessService.signUp(req.body),
        }).send(res);
    };

    logIn = async (req, res, next) => {
        new SuccessResponse({
            metaData: await AccessService.login(req.body),
        }).send(res);
    };
    logout = async (req, res, next) => {
        new SuccessResponse({
            message: "Logout success",
            metaData: await AccessService.logout({ keyStore: req.keyStore }),
        }).send(res);
    };

    handleRefreshToken = async (req, res, next) => {
        new SuccessResponse({
            message: "Get token success",
            metaData: await AccessService.handleRefreshToken({
                refreshToken: req.body.refreshToken,
                user: req.user,
                keyStore: req.keyStore,
            }),
        }).send(res);
    };
}
module.exports = new AccessController();
