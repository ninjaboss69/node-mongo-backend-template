const jwt = require("jsonwebtoken");
const config = require("../../../config/config");
const { PERMISSIONS_LIST } = require("../../constants/permissions");

exports.check_permissions = function (req, res, next, page = "error") {
  if (!req.headers.secret_key) {
    return res.status(401).send({ message: "Unauthorized Request" });
  }
  const secret_key = req.headers.secret_key;

  try {
    const payload = jwt.verify(secret_key, config.accessjwtsecret);

    if (!payload)
      return res.status(401).send({ message: "Unauthorized Request" });

    if (
      !payload.permissions?.includes(page) &&
      !payload.permissions.includes(PERMISSIONS_LIST.superadmin)
    )
      return res
        .status(401)
        .send({ message: "You are not allowed to call this api" });

    // permission passed
    next();
  } catch (error) {
    var errorCode = "Something went wrong";
    switch (error.message) {
      case "jwt malformed":
        errorCode = "malformed jwt";
        break;
      case "jwt expired":
        errorCode = "JWT token has expired";
        break;
      default:
        errorCode = "Invalid Token";
        break;
    }
    return res.status(401).send(errorCode);
  }
};
