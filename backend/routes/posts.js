const router = require("express").Router();
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
});

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

router.put("/like/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.body.userId)) {
    post.likes.push(req.body.userId);
  } else {
    post.likes = post.likes.filter(id => id !== req.body.userId);
  }

  await post.save();
  res.json(post);
});

module.exports = router;