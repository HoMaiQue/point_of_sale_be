"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { authentication } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const router = express.Router();

router.post("/user/signup", asyncHandler(accessController.signUp));
router.post("/user/login", asyncHandler(accessController.logIn));
router.get("/prevent-sleep", (req, res) => {
    return res.json("prevent sleep");
});

// authentication
router.use(authentication);
router.post("/user/logout", asyncHandler(accessController.logout));
router.post(
    "/user/handleRefreshToken",
    asyncHandler(accessController.handleRefreshToken)
);

module.exports = router;
