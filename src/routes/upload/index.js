"use strict";
const express = require("express");
const { authentication } = require("../../auth/authUtils");
const asyncHandler = require("../../helper/asyncHandler");
const uploadController = require("../../controllers/upload.controller");
const uploadMulter = require("../../models/ModelMulter");

const router = express.Router();

// authentication
router.use(authentication);
router.post(
    "",
    uploadMulter.single("file"),
    asyncHandler(uploadController.uploadSingleFile)
);

module.exports = router;
