const Joi = require("joi");

const CreateAdministratorValidator = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  fullname: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  permissions: Joi.array().items(Joi.string()).min(0).required(),
});

module.exports = {
  CreateAdministratorValidator,
};
