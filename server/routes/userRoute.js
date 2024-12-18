const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", authController.singUp);
router.post("/login", authController.login);
router.route("/").get(userController.findAll).post(userController.create);
router.get("/:identifier", userController.findOne);
router.patch("/update/:email", userController.updateByEmail);

module.exports = router;
