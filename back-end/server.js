const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! . . . Exiting...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("Database Connected"));

const port = 8080;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Exiting...");
  server.close(() => {
    process.exit(1);
  });
});
