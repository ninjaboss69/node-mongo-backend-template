const express = require("express");
const { check_permissions } = require("../../../app/middleware/auth");
const { PERMISSIONS_LIST } = require("../../../app/constants/permissions");
const router = express.Router();
const bannercontroller = require("../../../app/controllers/banner");

router.get(
  "/banners",
  (req, res, next) =>
    check_permissions(req, res, next, (page = PERMISSIONS_LIST.banner)),
  bannercontroller.get_banners
);
module.exports = router;
