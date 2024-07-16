const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = req.body.username;
    user.author = req.body.author;
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

exports.signupUserPost = [
  body("username", "Username must be specified and at least 6 characters long")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("password", "Password must be specified and at least 10 characters long")
    .trim()
    .isLength({ min: 10 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      await user.save();
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (err) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Server error" });
    }
  }),
];

exports.loginUserPost = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log("current user" + user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Token created at login user post: " + token);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logoutUser = asyncHandler(async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log("User logged out, redirecting to home");
    res.redirect("/");
  });
});
