const express = require("express");
const backpanel = require("./backpanel");

module.exports = function (app, config) {
  app.use("/backpanel", backpanel);
};
