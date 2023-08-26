const express = require("express");
const router = express.Router();
const moderatorController = require("../controllers/moderatorController");
router.route("/").get(moderatorController.allPicture);
router.route("/angryPictures").get(moderatorController.angryPictures);
router.route("/:id").get(moderatorController.filteredTags);
router.route("/angryPictures/:id").put(moderatorController.delAngryPictures);

module.exports = router;
