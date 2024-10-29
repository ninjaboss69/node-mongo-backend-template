const express = require("express");
const {
  PERMISSIONS_LIST,
  PERMISSIONS_LIST_BY_PAGE,
} = require("../../../app/constants/permissions");
const { get_permissions } = require("../../../app/controllers/permission");
const router = express.Router();

router.get("/permissions", get_permissions);

module.exports = router;
