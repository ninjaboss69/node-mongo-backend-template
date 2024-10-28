const {
  CreateAdministratorValidator,
  UpdateAdminstratorValidator,
} = require("./validate");

function validate_create_administrator(req, res, next) {
  try {
    const payload = req.body;

    const schema = CreateAdministratorValidator;
    const { error } = schema.validate(payload);

    if (error) {
      return res.status(412).send({ message: error.details[0].message });
    }

    next();
  } catch (err) {
    next(err);
  }
}

function validate_update_administrator(req, res, next) {
  try {
    const payload = req.body;
    const schema = UpdateAdminstratorValidator;
    const { error } = schema.validate(payload);

    if (error) {
      return res.status(412).send({ message: error.details[0].message });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validate_create_administrator,
  validate_update_administrator,
};
