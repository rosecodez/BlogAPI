const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentRouter = require("./routes/commentsRouter");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

app.use(bodyParser.json());
app.use(express.json());

const mongoDB = process.env.MONGODB_URI;

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("Server is running on port 3000");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/posts", commentRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
