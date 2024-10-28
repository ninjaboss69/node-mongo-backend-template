const express = require("express");
const router = express.Router();
const validater = require("../../../app/middleware/validateSchema");
const {
  create_administrators,
} = require("../../../app/controllers/auth/administrator");

router.post(
  "/create-admin",
  validater.validate_create_administrator,
  create_administrators
);

module.exports = router;
