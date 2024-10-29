const cookieParser = require("cookie-parser");

var createServer = function () {
  const express = require("express");
  const mongoose = require("mongoose");
  const bodyParser = require("body-parser");

  const config = require("./config/config");

  if (mongoose.connection.readyState !== 1) {
    console.log("database " + config.db);

    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on("error", function (err) {
      throw new Error(
        "Unable to connect to database at " + config.db + "\n" + err
      );
    });

    db.once("open", function () {
      console.log("Mongodb is connected");
    });
  }

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log("Mongoose Disconnected through app termination");
      process.exit(0);
    });
  });

  var app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  app.use(cookieParser());

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "AUTHORIZATION, Origin, X-Requested-With,Content-Type,Accept,SECRET_KEY"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Cache-Control", "no-cache");
    next();
  });

  require("./routes/index")(app, config);

  var server = app.listen(config.port, function () {
    console.log("Server Listening on", config.host + ":" + config.port);
  });
  return server;
};

createServer();
