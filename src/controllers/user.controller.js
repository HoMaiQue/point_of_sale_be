const { SuccessResponse } = require("../core/success.response");
const UserService = require("../services/user.service");

class UserController {
    getAllUser = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all user successful",
            metaData: await UserService.getAllUser(),
        }).send(res);
    };
}

module.exports = new UserController();
