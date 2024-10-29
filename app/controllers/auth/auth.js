const jwt = require("jsonwebtoken");
const AdministratorSchema = require("../../../app/models/Adminstrator");

const config = require("../../../config/config");

exports.login_administrator = async (req, res, next) => {
  // ensure request body passed Joi Check

  try {
    const { username, password } = req.body;

    const administrator = await AdministratorSchema.findOne({ username });

    if (!administrator) {
      return res.status(404).send({ message: "Username not exits" });
    }

    const isValidPassword = administrator.comparePassword(password);

    if (isValidPassword) {
      const tokens = administrator.getTokens();

      res.status(200).send({ message: "Sucessfully Login", tokens });
    } else {
      res.status(401).send({ message: "Unauthorized Login" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

exports.swap_token = async (req, res) => {
  // if the status code is not 200, frontend must logout immediately
  try {
    if (!req.headers.secret_key) {
      return res.status(401).send({ message: "Secret Key is missing" });
    }

    const secret_key = req.headers.secret_key;

    const payload = jwt.verify(secret_key, config.refreshjwtsecret);

    if (payload) {
      const administrator = await AdministratorSchema.findOne({
        username: payload.username,
      });

      if (!administrator) {
        return res
          .status(404)
          .send({ message: "Refresh Token Secret is Being Exposed!!!!" });
        // Immediately Alert Software Team
      }
      // generate access token here

      const { accessToken } = administrator.renewAccessToken();

      return res.status(200).send({
        message: "Successfully Swap Token",
        tokens: { accessToken, refreshToken: secret_key },
      });
    } else return res.status(401).send({ message: "Unauthoirzed Request" });
  } catch (error) {
    let errorCode = "";
    switch (error?.message) {
      case "jwt malformed":
        errorCode = "jwt malformed";
        break;
      case "jwt expired":
        errorCode = "jwt expired";
        break;
      default:
        errorCode = "cannot verify integrity";
        break;
    }
    if (errorCode !== "") return res.status(401).send({ message: errorCode });
    return res.status(500).send({ message: "Something went wrong" });
  }
};
