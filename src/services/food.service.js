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
                status: "active",
            })
            .select(unGetSelectData(["__v"]));
    }
    static async getAllFood() {
        return await food
            .find({})
            .sort({ _id: -1 })
            .populate("food_type")
            .lean();
    }
    static async changeStatusFood({ foodId }) {
        const foundFood = await food.findById(foodId);
        if (!foundFood) {
            throw new NotFoundError("Food not exist");
        }
        const { status } = foundFood;
        if (status === "active") {
            foundFood.status = "inactive";
        } else {
            foundFood.status = "active";
        }
        const { modifiedCount } = await foundFood.update(foundFood);
        return modifiedCount;
    }
    static async searchFood({ keySearch }) {
        const regexSearch = new RegExp(keySearch);

        const result = await food
            .find(
                {
                    $text: { $search: regexSearch },
                },
                { score: { $meta: "textScore" } }
            )
            .populate("food_type")
            .sort({ score: { $meta: "textScore" } })
            .lean();
        return result;
    }
    static async updateFood({ foodId, payload }) {
        const newPayload = removeUndefinedObject(payload);
        return await user.findByIdAndUpdate(foodId, newPayload, { new: true });
    }
}

module.exports = FoodService;
