"use strict";
const express = require("express");
const { authentication } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const orderController = require("../../controllers/order.controller");
const router = express.Router();

// authentication
router.use(authentication);
router.post("", asyncHandler(orderController.createOrder));
router.get("", asyncHandler(orderController.getAllOrder));

module.exports = router;
