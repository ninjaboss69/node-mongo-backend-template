const {
  CreateAdministratorValidator,
  UpdateAdminstratorValidator,
  LoginAdministratorValidator,
} = require("./validate");

function validate_create_administrator(req, res, next) {
  try {
    const payload = req.body;

    const { error } = CreateAdministratorValidator.validate(payload);

    if (error) {
      return res.status(412).send({ message: error.details[0].message });
    }

    next();
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
}

function validate_update_administrator(req, res, next) {
  try {
    const payload = req.body;

    const { error } = UpdateAdminstratorValidator.validate(payload);

    if (error) {
      return res.status(412).send({ message: error.details[0].message });
    }
    next();
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
}

function validate_login_administrator(req, res, next) {
  try {
    const payload = req.body;

    const { error } = LoginAdministratorValidator.validate(payload);
    if (error) {
      return res.status(412).send({ message: error.details[0].message });
    }
    next();
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
}

module.exports = {
  validate_create_administrator,
  validate_update_administrator,
  validate_login_administrator,
};
