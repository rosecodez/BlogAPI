const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");

const app = express();

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(cors());

const mongoDB = process.env.MONGODB_URI;

if (!mongoDB) {
  throw new Error("MONGODB_URI environment variable not set.");
}

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(express.json());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
