const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

// GET all users
router.get("/", userController.getAllUsers);

// PUT update a user by id
router.put("/:userId", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// DELETE a user by id
router.delete("/:userId", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// signup
router.get("/signup", userController.signupUser);
router.post("/signup", userController.signupUserPost);

// login
router.get("/login", userController.loginUser);
router.post("/login", userController.loginUserPost),
  (req, res) => {
    console.log("LOGIN REQ BODY: " + req.body);
  };

// logout
router.get("/logout", verifyToken, (req, res) => {
  res.json({ user: req.user });
});
// display user details
router.get("/user-details", verifyToken, (req, res) => {
  res.json({ user: req.user });
});
module.exports = router;
