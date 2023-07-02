const { SuccessResponse } = require("../core/success.response");
const CategoryService = require("../services/category.service");

class CategoryController {
    getAllCategory = async (req, res, next) => {
        new SuccessResponse({
            message: "Get category list success",
            metaData: await CategoryService.getAllCategory(),
        }).send(res);
    };
    createCategory = async (req, res, next) => {
        new SuccessResponse({
            message: "Create category success",
            metaData: await CategoryService.createCategory({
                ...req.body,
            }),
        }).send(res);
    };
}

module.exports = new CategoryController();
