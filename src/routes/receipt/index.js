"use strict";
const express = require("express");
const { authentication } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const receiptController = require("../../controllers/receipt.controller");
const router = express.Router();

// authentication
router.use(authentication);
router.post("", asyncHandler(receiptController.createReceipt));
router.get("/revenue", asyncHandler(receiptController.revenue));
router.get("/overview", asyncHandler(receiptController.getOverview));

module.exports = router;
