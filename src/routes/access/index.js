"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { authenticationV2 } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const router = express.Router();

router.post("/user/signup", asyncHandler(accessController.signUp));
router.post("/user/login", asyncHandler(accessController.logIn));

// authentication
// router.use(authenticationV2)
// router.post("/shop/logout", asyncHandler(accessController.logout));
// router.post("/shop/handleRefreshToken", asyncHandler(accessController.handleRefreshToken));

module.exports = router;
