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
  },
  getSubscribedPosts: async (req, res, next) => {
    try {
      const posts = await Post.find({ author: { $in: req.user.following }}).populate('author', '_id name imageUrl').populate('comments.postedy', '_id name');

      if(posts){
        return res.status(200).json(posts)
      }
    } catch(err){
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  likePost: async (req, res, next) => {
    try {
      const likedPost = await Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
      }, {
        new: true
      }).populate('author', '_id name').exec()

      if(likedPost){
        return res.json(likedPost);
      }
    } catch(err){
      console.log(err);
      res.status(422).json({ error: err })
    }
  },
  unlikePost: async (req, res, next) => {
    try {
      const unlikedPost = await Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
      }, {
        new: true
      }).populate('author', '_id name').exec()

      if(unlikedPost){
        return res.json(unlikedPost);
      }
    } catch(err){
      console.log(err);
      res.status(422).json({ error: err })
    }
  },
  commentPost: async (req, res, next) => {
    const comment = {
      text: req.body.text,
      postedBy: req.user._id
    }
    try {
      const commentedPost = await Post.findByIdAndUpdate(req.body.postId, {
        $push: { comments: comment }
      }, {
        new: true
      }).populate('comments.postedBy', '_id name').populate('author', '_id name').exec()

      if(commentedPost){
        return res.json(commentedPost);
      }
    } catch(err){
      console.log(err);
      res.status(422).json({ error: err })
    }
  },
  deletePost: async (req, res, next) => {
   try {
      // const postToDelete = await Post.findOne({ _id: req.params.postId })
      const postToDelete = await Post.findOne({ _id: req.params.postId }).populate('author', '_id').exec();

      if(!postToDelete){
        res.status(422).json({ error: 'post not found' });
        return;
      }

      if(postToDelete.author._id.toString() === req.user._id.toString()){
        const result = await postToDelete.remove();
        if(result){
          res.json(result);
        }
      }
   } catch(err){
      console.log(err);
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const commentToDelete = await Post.findByIdAndUpdate(req.params.postId, {
        $pull: { comments: { _id: req.params.commentId }}
      }, {
        new: true
      }).populate('comments.postedBy', '_id name').populate('author', '_id name').exec()

      if(commentToDelete){
        return res.json(commentToDelete);
      }
    } catch(err){
      console.log(err);
    }
  }
}