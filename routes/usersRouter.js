const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET all users
router.get("/", userController.getAllUsers);

// PUT update a user by id
router.put("/:userId", userController.updateUser);

// DELETE a user by id
router.delete("/:userId", userController.deleteUser);

// signup
router.get("/signup", userController.signupUser);
router.post("/signup", userController.signupUserPost);

// login
router.get("/login", userController.loginUser);
router.post("/login", userController.loginUserPost);

// logout
router.get("/logout", userController.logoutUser);

// display user details
router.get("/user-details", userController.userDetails);

module.exports = router;
