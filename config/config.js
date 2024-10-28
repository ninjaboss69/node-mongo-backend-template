var path = require("path");
require("dotenv").config();

var rootPath = path.normalize(__dirname + "/..");

console.log("env :", process.env.NODE_ENV);

var config = {
  Development: {
    env: "Development",
    root: rootPath,
    app: {
      name: "content-usage",
    },
    port: process.env.DEV_PORT,
    host: process.env.DEV_HOST,
    cc: process.env.ccmail,
    db: `${process.env.DEV_DB_URI}`,
    secretKey: process.env.DEV_SECRET,
    accessjwtsecret: process.env.DEV_ACCESS_SECRET,
    accessjwtexpire: process.env.DEV_ACCESS_EXPIRE,
    refreshjwtsecret: process.env.DEV_REFRESH_SECRET,
    refreshjwtexpire: process.env.DEV_REFRESH_EXPIRE,
  },
};

module.exports = config["Development"];
