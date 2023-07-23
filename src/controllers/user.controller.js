const { SuccessResponse } = require("../core/success.response");
const UserService = require("../services/user.service");

class UserController {
    getAllUser = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all user successful",
            metaData: await UserService.getAllUser(),
        }).send(res);
    };
    changeStatusUser = async (req, res, next) => {
        new SuccessResponse({
            message: "Change status successfully",
            metaData: await UserService.changeStatusUser({
                userId: req.body.userId,
            }),
        }).send(res);
    };
    updateUser = async (req, res, next) => {
        new SuccessResponse({
            message: "Update user successfully",
            metaData: await UserService.updateUser({
                userId: req.params.userId,
                payload: { ...req.body },
            }),
        }).send(res);
    };
    searchUser = async (req, res, next) => {
        new SuccessResponse({
            message: "Search user successfully",
            metaData: await UserService.searchUser(req.params),
        }).send(res);
    };
}

module.exports = new UserController();
