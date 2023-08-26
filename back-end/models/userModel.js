const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please tell use your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "moderator", "admin"],
    default: "user",
  },
});

// set password update timestamp
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000; //subtract 1 sec from current time so that lag in saving is compensated
  next();
});

userSchema.pre("save", async function (next) {
  // only run this function if password was actually modified
  if (!this.isModified("password")) return next();
  //   Has the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
});

// Hide inactive users
userSchema.pre(/^find/, function (next) {
  // this points to current query
  this.find({ isActive: { $ne: false } });
  next();
});

// Decrypt the password using instance
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    // convert into seconds as jwtTimeStamp is in seconds
    const changedAtTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedAtTimeStamp;
  }

  // False means not changed here
  return false;
};

// reset password
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //convert to milliseconds (10mins)

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
