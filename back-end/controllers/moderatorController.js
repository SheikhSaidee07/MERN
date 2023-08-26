const catchAsync = require("../utils/catchAsync");
const picture = require("../models/pictureModel");

exports.allPicture = catchAsync(async (req, res, next) => {
  let userPictures;
  console.log(req.query.filter);
  if (Object.keys(req.query).length === 0 || req.query.filter == "all") {
    userPictures = await picture.find({}).populate("user_id");
  } else {
    userPictures = await picture
      .find({ tags: req.query.filter })
      .populate("user_id");
  }
  res.status(200).json({
    status: "success",
    data: {
      userPictures,
    },
  });
});

exports.angryPictures = catchAsync(async (req, res, next) => {
  const angryTagged = await picture.find({ tags: "angry" });
  console.log(angryTagged);
  res.status(200).json({
    status: "success",
    data: {
      angryTagged,
    },
  });
});
exports.delAngryPictures = catchAsync(async (req, res, next) => {
  const pictureId = req.params.id;
  const data = await picture.findOneAndUpdate(
    { _id: pictureId, tags: "angry" },
    { isRestricted: true },
    { new: true }
  );
  console.log(data);
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
});
exports.filteredTags = catchAsync(async (req, res, next) => {
  const foundTag = await picture.find({ tags: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      foundTag,
    },
  });
});
