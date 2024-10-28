const express = require("express");
const router = express.Router();
const validater = require("../../../app/middleware/validateSchema");
const {
  create_administrators,
  update_administrators,
} = require("../../../app/controllers/auth/administrator");

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

module.exports = router;
