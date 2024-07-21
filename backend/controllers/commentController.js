const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Get all comments for a specific post
const getAllComments = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific comment by id for a post
const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (err) {
    console.error("Error in getCommentById:", err);
    next(err);
  }
};

// Create a new comment for a post
const createComment = async (req, res, next) => {
  const { postId } = req.params;
  const { text, userId } = req.body;
  try {
    const postExists = await Post.exists({ _id: postId });
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = new Comment({
      postId,
      text,
      user: userId,
      timestamp: new Date(),
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    if (err.name === "ValidationError") {
      res.status(400).json({ message: err.message });
    } else {
      next(err);
    }
  }
};

// Update a comment by id for a post
const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.text = "hmm";
    comment.timestamp = new Date();
    comment.user = comment.user;

    await comment.save();

    res.json(comment);
  } catch (err) {
    next(err);
  }
};

// Delete a comment by id for a post
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await comment.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
