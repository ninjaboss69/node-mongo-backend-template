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
    const existingAdmin = await AdministratorSchema.findById(
      req.body._id
    ).lean();

    if (!existingAdmin) {
      return res.status(409).send({ message: "Cannot find user to update" });
    }

    console.log(existingAdmin);
    res.status(200).send({ message: "Successfully Updated Admin" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};
