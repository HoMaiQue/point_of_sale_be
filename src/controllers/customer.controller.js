const { SuccessResponse } = require("../core/success.response");
const CustomerService = require("../services/customer.service");

class CustomerController {
    createCustomer = async (req, res, next) => {
        new SuccessResponse({
            message: "Create customer successfully",
            metaData: await CustomerService.createCustomer({
                ...req.body,
            }),
        }).send(res);
    };
}

module.exports = new CustomerController();
