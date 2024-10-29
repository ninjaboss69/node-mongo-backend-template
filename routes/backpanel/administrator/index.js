const express = require("express");
const router = express.Router();
const validater = require("../../../app/middleware/validateSchema");
const {
  create_administrators,
  update_administrators,
} = require("../../../app/controllers/auth/administrator");
const { login_administrator } = require("../../../app/controllers/auth/auth");

router.post(
  "/create-admin",
  validater.validate_create_administrator,
  create_administrators
);

router.put(
  "/update-admin",
  validater.validate_update_administrator,
  update_administrators
);

router.post(
  "/login-admin",
  validater.validate_login_administrator,
  login_administrator
);

module.exports = router;
