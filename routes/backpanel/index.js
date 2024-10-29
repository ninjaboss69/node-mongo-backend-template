const express = require("express");
const cors = require("cors");
const router = express.Router();
router.options("*", cors());
const adminstrator_route_list = require("./administrator");
const banner_route_list = require("./banner");
const permission_route_list = require("./permission");

router.use("/", adminstrator_route_list);
router.use("/", banner_route_list);
router.use("/", permission_route_list);

module.exports = router;
