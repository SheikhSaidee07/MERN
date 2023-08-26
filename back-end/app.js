const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const pictureRoutes = require("./routes/pictureRoutes");
const moderatorRoutes = require("./routes/moderatorRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/pictures", pictureRoutes);
app.use("/api/v1/moderator", moderatorRoutes);
app.use("/api/v1/admin", adminRoutes);
// unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error
app.use(globalErrorHandler);

module.exports = app;
