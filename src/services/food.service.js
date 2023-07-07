const { unGetSelectData, convertToObjectIdMongodb } = require("../utils");
const food = require("../models/food.model");
const user = require("../models/user.model");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { findUser } = require("../models/repo/user.repo");
class FoodService {
    static async createFood({ userId, ...payload }) {
        const foundUser = await findUser(userId);
        if (!foundUser) throw new NotFoundError("User not found");

        const { roles } = foundUser;

        if (!roles.includes("ADMIN")) {
            throw new BadRequestError("You must be an administrator");
        }

        const newFood = await food.create({
            ...payload,
        });

        return newFood;
    }
    static async getFoodByCategoryId({ categoryId }) {
        return await food
            .find({
                food_type: convertToObjectIdMongodb(categoryId),
            })
            .select(unGetSelectData(["__v"]));
    }
}

module.exports = FoodService;
