const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const SALTROUNDS = 10;

var AdminstratorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    permissions: {
      type: [],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "administrators", versionKey: false }
);

AdminstratorSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(SALTROUNDS, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

AdminstratorSchema.pre("updateOne", async function (next) {
  try {
    const update = this.getUpdate();

    if (update.$set && update.$set.password) {
      const salt = bcrypt.genSalt(SALTROUNDS, (err, salt) => {
        if (err) {
          return next(err);
        }
      });

      bcrypt.hash(update.$set.password, salt, null, (error, hash) => {
        if (error) {
          return next(error);
        }
        update.$set.password = hash;
        next();
      });
    }
    next();
  } catch (err) {
    next(err);
  }
});

AdminstratorSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

AdminstratorSchema.methods.getTokens = function () {
  const accessToken = jwt.sign(
    {
      fullname: this.fullname,
      permissions: this.permissions,
      username: this.username,
    },
    config.accessjwtsecret,
    {
      expiresIn: config.accessjwtexpire,
    }
  );

  const refreshToken = jwt.sign(
    { username: this.username },
    config.refreshjwtsecret,
    {
      expiresIn: config.refreshjwtexpire,
    }
  );

  return { accessToken, refreshToken };
};

module.exports = mongoose.model("administrators", AdminstratorSchema);
