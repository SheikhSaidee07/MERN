const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// console.log(authController.register);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.use(authController.protect);
module.exports = router;
