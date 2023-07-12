const { unGetSelectData, convertToObjectIdMongodb } = require("../utils");
const food = require("../models/food.model");
const user = require("../models/user.model");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const receipt = require("../models/receipt.model");
const order = require("../models/order.model");
class ReceiptService {
    static async createReceipt(payload) {
        const { order_id } = payload;
        const foundOrder = order.findById(order_id).lean();
        if (!foundOrder) {
            throw NotFoundError("order not found");
        }

        const newReceipt = await receipt.create({ ...payload });

        return newReceipt;
    }
}

module.exports = ReceiptService;
