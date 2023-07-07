"use strict";
const express = require("express");
// const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();
// check api key
// router.use(apiKey);
// // // check permissions
// router.use(permission("000"));

// router.use("/v1/api/product", require("./product"));
router.use("/v1/api", require("./access"));
router.use("/v1/api/category", require("./category"));
router.use("/v1/api/food", require("./food"));
router.use("/v1/api/order", require("./order"));
router.use("/v1/api/customer", require("./customer"));

module.exports = router;