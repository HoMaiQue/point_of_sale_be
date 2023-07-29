const { unGetSelectData, convertToObjectIdMongodb } = require("../utils");
const food = require("../models/food.model");
const user = require("../models/user.model");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const receipt = require("../models/receipt.model");
const order = require("../models/order.model");
const product = require("../models/food.model");
const category = require("../models/category.model");
const customer = require("../models/customer.model");
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

    static async getOverview() {
        const receiptList = await receipt.find({}).lean();

        let total = 0;
        if (receiptList) {
            total = receiptList.reduce((acc, item) => {
                return acc + +item.amount;
            }, 0);
        }

        const productList = await product.find({}).lean();
        const categoryList = await category.find({}).lean();
        const customerList = await customer.find({}).lean();

        return {
            total: total,
            category: categoryList.length,
            product: productList.length,
            customer: customerList.length,
        };
    }
}

module.exports = ReceiptService;
