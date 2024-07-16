const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

// GET all users
router.get("/", userController.getAllUsers);

// PUT update a user by id
router.put("/:userId", verifyToken, userController.updateUser);

// DELETE a user by id
router.delete("/:userId", verifyToken, userController.deleteUser);

// signup
//router.get("/signup", userController.signupUser);
router.post("/signup", userController.signupUserPost);

// login
//router.get("/login", userController.loginUser);
router.post("/login", userController.loginUserPost);

// logout
router.get("/logout", verifyToken, userController.logoutUser);

// display user details
router.get("/profile", verifyToken, userController.getProfile);

module.exports = router;
