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

      // set secure to true in production environment

      res.cookie("Bearer", tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.status(200);
      res.send({
        message: "Successfully Login",
        accessToken: tokens.accessToken,
      });
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
    if (!req.cookies.Bearer || !req.cookies.Bearer) {
      return res.status(401).send({ message: "Required Cookie Not Found" });
    }

    const secret_key = req.cookies.Bearer;

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

      const { accessToken } = administrator.renewAccessToken();

      return res.status(200).send({
        message: "Successfully Swap Token",
        tokens: { accessToken, refreshToken: secret_key },
      });
    } else return res.status(401).send({ message: "Unauthoirzed Request" });
  } catch (error) {
    // Not Reaching to status 500 since we used default
    // Later Fix this code

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
    // if something wrong with refresh token
    // we better delete this token to protect futhur suspicious activity
    // or to logout simply
    res.clearCookie("Bearer");
    return res.status(401).send({ message: errorCode });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("Bearer", { path: "/" });
    res.send({ message: "Successfully Logout" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
