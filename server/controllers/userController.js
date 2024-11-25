const User = require("./../modal/userModal");
const mongoose = require("mongoose");

exports.findAll = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      length: user.length,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "companies",
          localField: "company",
          foreignField: "name",
          as: "companyDetail",
        },
      },
    ]);

    if (!user || user.length === 0) {
      res.status(404).json({
        status: "fail",
        message: "User don't have a company",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
