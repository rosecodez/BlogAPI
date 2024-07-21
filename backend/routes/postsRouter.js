const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");

// GET all posts
router.get("/", postController.getAllPosts);

// GET a specific post by id
router.get("/:postId", postController.getPostById);

// POST create a new post
//router.get("/createPost", postController.createPostGet);
router.post("/createPost", verifyToken, postController.createPostPost);

// PUT update a post by id
router.put("/:postId", postController.updatePost);

// DELETE a post by id
router.delete("/:postId", verifyToken, postController.deletePost);

module.exports = router;
