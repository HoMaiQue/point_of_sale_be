"use strict";
const express = require("express");
const { authentication } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const receiptController = require("../../controllers/receipt.controller");
const router = express.Router();

// authentication
router.use(authentication);
router.post("", asyncHandler(receiptController.createReceipt));

module.exports = router;
