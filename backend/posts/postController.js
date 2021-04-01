const { authMiddleware } = require('./../utils/authMiddleware');
const Post = require('./postModel');

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      const posts = await Post.find().populate('author', '_id name imageUrl').populate('comments.postedBy', '_id name');

      if(posts){
        return res.status(200).json(posts);
      }
    } catch(err){
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  createPost: async (req, res, next) => {
    try {
      const { text, imageUrl } = req.body;
      if(text.trim() == "" || !imageUrl){
        res.status(400).json({ message: "Fields must not be empty" });
        return;
      }

      req.user.password = undefined;
      const postData = {
        text,
        imageUrl,
        author: req.user
      }

      const post = new Post(postData);
      const newPost = await post.save();
      if(newPost){
        return res.status(201).json(newPost);
      }
    } catch (err){
      console.log(err);
      res.status(500).json({ general: "Something went wrong" });
    }

  },
  getMyPosts: async(req, res, next) => {
    try {
      const myPosts = await Post.find({ author: req.user._id }).populate('author', '_id name');
      if(myPosts){
        res.status(200).json(myPosts);
      }
    } catch(err){
      console.log(err);
    }
  }
}