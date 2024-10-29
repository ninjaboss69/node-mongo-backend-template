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
