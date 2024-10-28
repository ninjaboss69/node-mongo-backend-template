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
