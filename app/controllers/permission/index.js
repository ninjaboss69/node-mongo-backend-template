const { PERMISSIONS_LIST_BY_PAGE } = require("../../constants/permissions");

exports.get_permissions = (req, res) => {
  try {
    res.status(200).send({ PERMISSIONS_LIST_BY_PAGE });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
