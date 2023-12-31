"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { authentication } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const categoryController = require("../../controllers/category.controller");
const router = express.Router();



// authentication
router.use(authentication);
router.get("/", asyncHandler(categoryController.getAllCategory));
router.post("/", asyncHandler(categoryController.createCategory));


module.exports = router;
