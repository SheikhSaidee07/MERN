const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const userController = require("../controllers/userController");
router
  .route("/")
  .get(auth.protect, auth.restrictTo("admin"), userController.getAllUsers);

module.exports = router;
