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

    static async revenueByDay({ startDate, endDate }) {
        console.log(123);
        const start = new Date(startDate);
        const end = new Date(endDate);

        const revenueList = await receipt.aggregate([
            {
                $match: {
                    payment_date: { $gte: start, $lte: end },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: "$payment_date",
                        },
                    },

                    totalRevenue: { $sum: "$amount" },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);
        return revenueList;
    }
}

module.exports = ReceiptService;
