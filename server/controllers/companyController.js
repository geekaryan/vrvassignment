const mongoose = require("mongoose");
const Company = require("./../modal/companyModal");

exports.findAll = async (req, res) => {
  try {
    const company = await Company.find();
    res.status(200).json({
      status: "success",
      data: {
        company,
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
    const companyId = req.params.id;
    const company = await Company.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(companyId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "name",
          foreignField: "company",
          as: "workers",
        },
      },
    ]);
    if (!company || company.length === 0) {
      res.status(404).json({
        status: "fail",
        message: "Company not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        company: company,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(200).json({
      status: "success",
      length: company.length,
      data: {
        company,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
