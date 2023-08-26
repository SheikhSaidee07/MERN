const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.route("/").get(adminController.allUsers).post(adminController.addUser);

router
  .route("/:id")
  .get(adminController.getPicture)
  .put(adminController.updatePicture);

router
  .route("/users")
  .get(adminController.allPictures)
  .post(adminController.uploadPicture);

router
  .route("/users/:id")
  .delete(adminController.deleteUser)
  .put(adminController.updateUser);

module.exports = router;
