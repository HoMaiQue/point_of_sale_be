const { unGetSelectData, convertToObjectIdMongodb } = require("../utils");
const food = require("../models/food.model");
const user = require("../models/user.model");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const customer = require("../models/customer.model");
const order = require("../models/order.model");
class customerService {
    static async createCustomer(payload) {
        const newCustomer = await customer.create({ ...payload });
        return newCustomer;
    }
}

module.exports = customerService;
