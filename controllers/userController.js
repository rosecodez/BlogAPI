const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

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

exports.signupUser = asyncHandler((req, res, next) => {
  res.render("signup-form");
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
      return res.status(400).render("sign-up-form", {
        errors: errors.array(),
        user: req.body,
      });
    }

    try {
      const existingUser = await User.findOne({ username: req.body.username });
      if (existingUser) {
        return res.status(400).render("sign-up-form", {
          errors: [{ msg: "Username already taken" }],
          user: req.body,
        });
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      await user.save();
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  }),
];

exports.loginUser = asyncHandler((req, res) => {
  res.render("login-form");
});

exports.loginUserPost = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
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

exports.userDetails = (req, res) => {
  if (req.isAuthenticated()) {
    console.log(`User details accessed for user: ${req.user.username}`);
    res.render("user-details", { user: req.user });
  } else {
    console.log("User not authenticated, redirecting to login");
    res.redirect("/users/login");
  }
};
