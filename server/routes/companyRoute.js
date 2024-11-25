const express = require("express");
const companyController = require("./../controllers/companyController");

const router = express.Router();

router.route("/").get(companyController.findAll).post(companyController.create);
router.route("/:id").get(companyController.findOne);

module.exports = router;
