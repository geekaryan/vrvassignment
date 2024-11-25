const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Company must have a name"],
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A company must have some employee"],
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
