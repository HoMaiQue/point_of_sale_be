"use strict";
const express = require("express");
const { authentication } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const customerController = require("../../controllers/customer.controller");
const router = express.Router();

// authentication
router.use(authentication);
router.post("", asyncHandler(customerController.createCustomer));

module.exports = router;
