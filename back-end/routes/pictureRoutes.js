const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/pictureController");
router
  .route("/:id")
  .post(pictureController.uploadPicture)
  .get(pictureController.getUserPictures)
  .put(pictureController.updatePicture)
  .delete(pictureController.deletePicture);
module.exports = router;
