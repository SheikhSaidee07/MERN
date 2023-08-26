const catchAsync = require("../utils/catchAsync");
const picture = require("../models/pictureModel");
const User = require("../models/userModel");

exports.allPictures = catchAsync(async (req, res, next) => {
  const allPictures = await picture.find({});
  res.status(200).json({
    status: "success",
    data: {
      allPictures,
    },
  });
});
exports.uploadPicture = catchAsync(async (req, res, next) => {
  const pic = await picture.create({ ...req.body, user_id: req.params.id });
  res.status(201).json({
    status: "success",
    data: {
      pic,
    },
  });
});
exports.getPicture = catchAsync(async (req, res, next) => {
  const singlePic = await picture.find({ user_id: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      singlePic,
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

exports.allUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find({});
  res.status(200).json({
    status: "success",
    data: {
      allUsers,
    },
  });
});

exports.addUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = jwt.sign(
    {
      id: newUser._id,
      name: newUser.name,
      role: newUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      deletedUser,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});
