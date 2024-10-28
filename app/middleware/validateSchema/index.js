const { CreateAdministratorValidator } = require("./validate");

function validate_create_administrator(req, res, next) {
  try {
    const payload = req.body;
    const query = req.query;
    console.log(query);
    const schema = CreateAdministratorValidator;
    const { error } = schema.validate(payload);

    if (error) {
      console.log("validation failed");
      return res.status(412).send({ message: error.details[0].message });
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  validate_create_administrator,
};
