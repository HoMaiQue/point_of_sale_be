"use strict";
const express = require("express");
const { authentication } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const foodController = require("../../controllers/food.controller");
const router = express.Router();

// authentication
router.use(authentication);
router.post("", asyncHandler(foodController.createFood));
router.get("/:categoryId", asyncHandler(foodController.getFoodByCategoryId));
router.get("", asyncHandler(foodController.getAllFood));
router.post("/status", asyncHandler(foodController.changeStatusFood));
router.get("/search/:keySearch", asyncHandler(foodController.searchFood));
router.patch("/:foodId", asyncHandler(foodController.updateFood));

module.exports = router;
