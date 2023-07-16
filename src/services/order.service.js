const { unGetSelectData, convertToObjectIdMongodb } = require("../utils");
const food = require("../models/food.model");
const user = require("../models/user.model");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const customer = require("../models/customer.model");
const order = require("../models/order.model");
class orderService {
    static async createOrder(payload) {
        const { customer_id } = payload;
        const foundCustomer = await customer.findById(customer_id).lean();
        if (!foundCustomer) {
            throw new NotFoundError("Customer not found");
        }
        const newOrder = await order.create({ ...payload });
        return newOrder;
    }
    static async getAllOrder() {
        const orderList = await order
            .find({})
            .populate("customer_id", "customer_name customer_phone")
            .populate("items.food_id", "food_name food_image")
            .select(unGetSelectData(["__v"]))
            .lean();
        return orderList;
    }
}

module.exports = orderService;
