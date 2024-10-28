const express = require("express");
const cors = require("cors");
const router = express.Router();
router.options("*", cors());
const adminstrator_route_list = require("./administrator/index");

router.use("/", adminstrator_route_list);

module.exports = router;
