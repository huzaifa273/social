const router = require("express").Router();
const Post = require("../Modals/Post");
const User = require("../Modals/User");
const { verifyToken } = require("./verifyToken");

//Create post
router.post("/user/post", verifyToken, async (req, res) => {
  try {
    let { title, image, video } = req.body;
    let newPost = new Post({
      title,
      image,
      video,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    return res.status(400).status({ "Error occured": error });
  }
});

// upload post by one user
router.get("/get/post/:id", verifyToken, async (req, res) => {
  try {
    const myPost = await Post.find({ user: req.params.id });
    if (!myPost) {
      return res.status(200).json("You Don't have any posts for now");
    }
    res.status(200).json(myPost);
  } catch (error) {
    res.status(400).json("Internal server error");
  }
});

//update user post
router.put("/update/post/:id", verifyToken, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json("Post does not found");
    }
    post = await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    let updatePost = await post.save();
    res.status(200).json(updatePost);
  } catch (error) {
    return res.status(500).json("Internal Error occured");
  }
});

// Like a post
router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.like.includes(req.body.user)) {
      await post.updateOne({ $push: { like: req.body.user } });
      return res.status(200).json("Post has been Liked");
    } else {
      await post.updateOne({ $pull: { like: req.body.user } });
      return res.status(200).json("Post has been unliked");
    }
  } catch (error) {
    return res.status(500).json("Internal error occured");
  }
});

// Comment
router.put("/comment/post", verifyToken, async (req, res) => {
  try {
    const { comment, postId, profilePicture } = req.body;
    const comments = {
      user: req.user.id,
      username: req.user.username,
      comment: comment,
      profilePicture: profilePicture,
    };
    const post = await Post.findById(postId);
    post.comments.push(comments);
    await post.save();
    res.status(200).json(post.comments);
  } catch (error) {
    return res.status(500).json("Internal error ocurred");
  }
});

// Delete post
router.delete("/delete/post/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // console.log(post.user);
    // This line has a error to be resolved
    if (post.user === req.user.id) {
      await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json("Post has been deleted");
    } else {
      return res.status(400).json("You are not allowed to delete this post");
    }
  } catch (error) {
    return res.status(500).json({ "Internal error ocurred": error });
  }
});

module.exports = router;
