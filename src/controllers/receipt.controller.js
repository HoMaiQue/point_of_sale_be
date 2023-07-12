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
}

module.exports = new ReceiptController();
