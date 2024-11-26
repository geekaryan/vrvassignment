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
    const { identifier } = req.params; // Extract `identifier` from the route parameter

    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

    const matchCondition = isObjectId
      ? { _id: mongoose.Types.ObjectId(identifier) } // Match by ObjectId
      : { email: { $regex: `^${identifier}$`, $options: "i" } }; // Case-insensitive match by email

    const user = await User.aggregate([
      {
        $match: matchCondition,
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
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      statusL: "fail",
      message: err.message,
    });
  }
};

exports.updateByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(404).json({
        status: "fail",
        message: "Role is required for updating the user",
      });
    }

    const user = await User.findOneAndUpdate(
      { email: { $regex: `^${email}$`, $options: "i" } },
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
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
