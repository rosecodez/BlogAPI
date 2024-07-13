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

const createPostPost = [
  body("title", "Title must be specified").trim().isLength({ min: 1 }).escape(),
  body("text", "Text must be specified").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, text } = req.body;
      const existingPost = await Post.findOne({ text });

      if (existingPost) {
        return res.status(400).json({ message: "Post already exists" });
      }

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newPost = new Post({
        title,
        text,
        timestamp: new Date(),
        published: true,
        user: user._id,
      });

      await newPost.save();
      res.status(201).json(newPost);
    } catch (err) {
      console.error("Error creating post:", err);
      next(err);
    }
  }),
];

// Update a post by id
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById("667b43239f6f4fcf7c2775c2");
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    post.title = post.title;
    post.text =
      "Deploying my first server was an exhilarating experience. It was more than just writing code—it was about bringing my application to life and making it accessible to anyone with an internet connection. Here is a detailed account of how I did it, including the challenges I faced and the lessons I learned.The journey began with setting up my local development environment. I needed Node.js and npm (Node Package Manager) since my server was going to be built with Node.js. Downloading and installing Node.js was straightforward, thanks to the clear instructions on the official website. Once installed, verifying the installation with a couple of simple terminal commands gave me the confidence that everything was set up correctly.With the environment ready, I moved on to writing the server code. I chose the Express framework for its simplicity and efficiency. Express allowed me to create a basic server that could handle HTTP requests and responses. Writing the code was fun, and running the server locally to see `Hello, world!` displayed in my browser was a moment of pure joy. If you are thinking about deploying your first server, I encourage you to dive in. The process might seem daunting at first, but the rewards are well worth the effort. Happy coding!";
    post.timestamp = new Date();
    post.published = req.body.published;
    post.user = post.user;

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
  createPostGet,
  createPostPost,
  updatePost,
  deletePost,
};
