"use strict";
const express = require("express");
const { authentication } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const userController = require("../../controllers/user.controller");
const router = express.Router();

// authentication
router.use(authentication);
router.get("", asyncHandler(userController.getAllUser));

module.exports = router;
