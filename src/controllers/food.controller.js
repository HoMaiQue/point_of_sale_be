const { SuccessResponse } = require("../core/success.response");
const FoodService = require("../services/food.service");

class FoodController {
    createFood = async (req, res, next) => {
        new SuccessResponse({
            message: "Create food successfully",
            metaData: await FoodService.createFood({
                ...req.body,
                userId: req.user.userId,
            }),
        }).send(res);
    };
    getFoodByCategoryId = async (req, res, next) => {
        new SuccessResponse({
            message: "Get food successfully",
            metaData: await FoodService.getFoodByCategoryId({
                categoryId: req.params.categoryId,
            }),
        }).send(res);
    };
    getAllFood = async (req, res, next) => {
        new SuccessResponse({
            message: "Get all food successfully",
            metaData: await FoodService.getAllFood(),
        }).send(res);
    };
}

module.exports = new FoodController();
