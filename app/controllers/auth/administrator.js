const AdministratorSchema = require("../../models/Adminstrator");

exports.create_administrators = async (req, res) => {
  try {
    const { username, fullname, password, email, permissions } = req.body;

    const duplicateAdminList = await AdministratorSchema.aggregate([
      {
        $match: {
          $or: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      },
    ]);

    if (duplicateAdminList && duplicateAdminList.length >= 1) {
      res.status(409).send({ message: "Duplidate Data Found" });
      return;
    }

    const newAdministrator = AdministratorSchema({
      username,
      password,
      fullname,
      email,
      permissions,
    });
    const savedRes = await newAdministrator.save();

    res.status(200).send({ message: "Successfully Createrd An Administrator" });
  } catch (err) {
    // console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

exports.update_administrators = async (req, res) => {
  try {
    const { _id, username, fullname, password, email, permissions } = req.body;

    const updateObject = {};

    if (username) updateObject.username = username;
    if (fullname) updateObject.fullname = fullname;
    if (email) updateObject.email = email;
    if (permissions) updateObject.permissions = permissions;

    const existingAdmin = await AdministratorSchema.findById(_id).lean();

    if (!existingAdmin) {
      return res.status(409).send({ message: "Cannot find user to update" });
    }

    const sameUsernames = await AdministratorSchema.find({ username }).lean();

    // have to check if length >2 to ensure database is not corrupted by someone who has access to database

    if (
      (sameUsernames.length >= 1 && sameUsernames[0]._id.toString() !== _id) ||
      sameUsernames.length >= 2
    ) {
      return res.status(409).send({ message: "Username already Occupied" });
    }

    const updateAdministratorsResponse = await AdministratorSchema.updateOne(
      { _id },
      { $set: updateObject }
    );

    if (
      updateAdministratorsResponse.modifiedCount === 1 ||
      updateAdministratorsResponse.matchedCount === 1
    ) {
      return res.status(200).send({
        message: "Successfully Updated Admin",
      });
    } else {
      return res.status(404).send({
        message: "Something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};
