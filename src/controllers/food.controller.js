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
    changeStatusFood = async (req, res, next) => {
        new SuccessResponse({
            message: "Change status food successfully",
            metaData: await FoodService.changeStatusFood({
                foodId: req.body.foodId,
            }),
        }).send(res);
    };
    searchFood = async (req, res, next) => {
        new SuccessResponse({
            message: "Search food successfully",
            metaData: await FoodService.searchFood(req.params),
        }).send(res);
    };
    updateFood = async (req, res, next) => {
        new SuccessResponse({
            message: "Update food successfully",
            metaData: await FoodService.updateFood({
                foodId: req.params.foodId,
                payload: { ...req.body },
            }),
        }).send(res);
    };
}

module.exports = new FoodController();
