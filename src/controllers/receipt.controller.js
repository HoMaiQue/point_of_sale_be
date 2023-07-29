const { SuccessResponse } = require("../core/success.response");
const ReceiptService = require("../services/receipt.service");

class ReceiptController {
    createReceipt = async (req, res, next) => {
        new SuccessResponse({
            message: "Create receipt successfully",
            metaData: await ReceiptService.createReceipt({
                ...req.body,
            }),
        }).send(res);
    };
    revenue = async (req, res, next) => {
        new SuccessResponse({
            message: "Get revenue successfully",
            metaData: await ReceiptService.revenueByDay({
                startDate: req.query.startDate,
                endDate: req.query.endDate,
            }),
        }).send(res);
    };
    getOverview = async (req, res, next) => {
        new SuccessResponse({
            message: "Get overview successfully",
            metaData: await ReceiptService.getOverview(),
        }).send(res);
    };
}

module.exports = new ReceiptController();
