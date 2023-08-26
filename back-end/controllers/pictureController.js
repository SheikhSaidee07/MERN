const catchAsync = require("../utils/catchAsync");
const picture = require("../models/pictureModel");

// Create a new picture
exports.uploadPicture = catchAsync(async (req, res, next) => {
  const pic = await picture.create({ ...req.body, user_id: req.params.id });
  res.status(201).json({
    status: "success",
    data: {
      pic,
    },
  });
});

exports.getUserPictures = catchAsync(async (req, res, next) => {
  const pictures = await picture.find({ user_id: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      pictures,
    },
  });
});
exports.updatePicture = catchAsync(async (req, res, next) => {
  const updatedPicture = await picture.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      updatedPicture,
    },
  });
});

exports.deletePicture = catchAsync(async (req, res, next) => {
  const delPicture = await picture.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      delPicture,
    },
  });
});
