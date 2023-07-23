"use strict";
const express = require("express");
const { authentication } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const userController = require("../../controllers/user.controller");
const router = express.Router();

// authentication
router.use(authentication);
router.get("", asyncHandler(userController.getAllUser));
router.post("/status", asyncHandler(userController.changeStatusUser));
router.patch("/:userId", asyncHandler(userController.updateUser));
router.get("/search/:keySearch", asyncHandler(userController.searchUser));

module.exports = router;
