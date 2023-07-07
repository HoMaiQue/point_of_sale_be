const { SuccessResponse } = require("../core/success.response");
const OrderService = require("../services/order.service");

class OrderController {
    createOrder = async (req, res, next) => {
        new SuccessResponse({
            message: "Create order successfully",
            metaData: await OrderService.createOrder({
                ...req.body,
            }),
        }).send(res);
    };
}

module.exports = new OrderController();
