const mongoose = require("mongoose");
// Define the schema for the Picture collection
const pictureSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  picture: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  isRestricted: {
    type: Boolean,
    default: false,
  },
});

// Create the Picture model
const Picture = mongoose.model("Picture", pictureSchema);

// Export the Picture model
module.exports = Picture;
