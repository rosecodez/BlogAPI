const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const verifyToken = require("../middleware/verifyToken");

// GET all comments for a post
router.get("/:postId/comments", commentController.getAllComments);

// GET a specific comment by id for a post
router.get("/:postId/comments/:commentId", commentController.getCommentById);

// POST create a new comment for a post
router.post(
  "/:postId/comments/newComment",
  verifyToken,
  commentController.createComment
);

// PUT update a comment by id for a post
router.put(
  "/:postId/comments/:commentId",
  verifyToken,
  commentController.updateComment
);

// DELETE a comment by id for a post
router.delete(
  "/:postId/comments/:commentId",
  verifyToken,
  commentController.deleteComment
);

module.exports = router;
