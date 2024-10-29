exports.get_banners = (req, res) => {
  try {
    res.status(200).send({ message: "Here is the banner list" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};
