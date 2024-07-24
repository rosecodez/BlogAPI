const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Get a specific post by id
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    next(err);
  }
};

const createPostPost = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);
    const user = await User.findById(req.body.userId);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      timestamp: new Date(),
      published: true,
      user: req.body.userId,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error creating new post:", err);
    next(err);
  }
};

// Update a post by id
const updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    post.title = req.body.title;
    post.text = req.body.text;
    post.timestamp = req.body.timestamp;
    post.published = true;
    post.user = req.body.userId;
    post.edited = "Edited";

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Delete a post by id
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.deleteOne();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  createPostPost,
};
