const jwt = require('jsonwebtoken');
const User = require('./userModel');
const Post = require('./../posts/postModel');
const { validateSignupData, validateLoginData } = require('./../utils/validators');
const { findById } = require('./userModel');

const createToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
}

module.exports = {
  createUser: async (req, res) => {
    const { name, email, password } = req.body;

    const { valid, errors } = validateSignupData(req.body);

    if(!valid) return res.status(422).json(errors);

    try {
      const existingUser = await User.findOne({ email: email });
      if(existingUser){
        res.status(400).json({ message: `${email} is already taken` });
      }

      const user = new User(req.body);
      const newUser = await user.save();
      if(newUser){
        res.status(201).json(newUser);
        return
      }
    } catch(err){
      console.log(err);
      res.status(500).json({ general: "Something went wrong, please try again" })
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      if(users){
        res.status(200).send(users);
      }
    } catch(err){
      console.log(err);
      res.status(500).json({ general: "Something went wrong, please try again"})
    }
  },
  loginUser: async (req, res, next) => {
    const { email, password } = req.body;
    const { valid, errors } = validateLoginData(req.body);

    if(!valid) return res.status(422).json(errors);

    try {
      const user = await User.findOne({ email: email });
      if(!user){
        res.status(400).json({ message: "Invalid email or password" });
        return;
      } else {
        const isMatch = await user.comparePasswords(password);
        if(!isMatch){
          res.status(400).json({ message: "Invalid email or password" });
          return;
        } else {
          const token = createToken({ id: user._id });
          res.cookie('pToken', token);
          res.status(200).send(user);
        } 
      }
    } catch(err){
      console.log(err);
      next(err);
    }
  },
  getMyDetails: async (req, res, next) => {
    try {
      // console.log('req.user.id', req.user.id);
      // console.log('req.user._id', req.user._id);
      const user = await User.findById(req.user.id);
      if(user){
        res.json({ data: user });
      }
    } catch(err){
      console.log(err);
      res.status(500).json({ message: "Something went wrong"})
    }
  },
  getMyProfile: async (req,res, next) => {
    try {
      const user = await User.findOne({ _id: req.user._id }).select("-password");
      if(user){
        const userPosts = await Post.find({ author: user._id }).populate('author', '_id name').exec();
        if(userPosts){
          res.status(200).json({ user, userPosts })
        }
      }
    } catch(err){
      console.log(err);
      res.status(404).json({ error: err })
    }
  },
  getUserDetails: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select('-password');
      if(user){
        const userPosts = await Post.find({ author: req.params.userId }).populate('author', '_id name').exec();
        if(userPosts){
          res.status(200).json({ user, userPosts })
        }
      }
    } catch(err){
      res.status(404).json({ error: err })
    }
  },
  followUser: async(req, res, next) => {
    try {
      const followedUser = await User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user.id }
      }, {
        new: true
      })
      if(followedUser){
        try {
          const followingUser = await User.findByIdAndUpdate(req.user.id, {
            $push: { following: req.body.followId }
          }, {
            new: true
          }).select('-password')

          if(followingUser){
            res.json({ followedUser, followingUser });
          }
        } catch(err){
          console.log(err);
          return res.status(422).json({ error: err });
        }
      }
    } catch (err){
      console.log(err);
      return res.status(422).json({ error: err })
    }
  },
  unfollowUser: async(req, res, next) => {
    try {
      const followedUser = await User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.user.id }
      }, {
        new: true
      }).select('-password')

      if(followedUser){
        try {
          const followingUser = await User.findByIdAndUpdate(req.user.id, {
            $pull: { following: req.body.unfollowId }
          }, {
            new: true
          })

          if(followingUser){
            res.json({ followedUser, followingUser })
          }
        } catch(err){
          console.log(err);
          return res.status(422).json({ error: err })
        }
      }
    } catch(err){
      console.log(err);
      return res.status(422).json({ eror: err })
    }
  },
  editUserProfile: async (req, res, next) => {
    try {
      const { imageUrl, website, bio } = req.body;
      const updatedUserProfile = await User.findByIdAndUpdate(req.user.id, {
        $set: { imageUrl, website, bio }
      }, {
        new: true
      })

      if(updatedUserProfile){
        const user =  {
          _id: updatedUserProfile._id,
          name: updatedUserProfile.name,
          email: updatedUserProfile.email,
          imageUrl: updatedUserProfile.imageUrl,
          bio: updatedUserProfile.bio,
          website: updatedUserProfile.website,
          followers: updatedUserProfile.followers,
          following: updatedUserProfile.following
        }
        res.json(user);
      }
    } catch(err){
      console.log(err);
    }
  },
  logoutUser: async (req, res, next) => {
    try {
      const expire = res.cookie('pToken', '', { expires: new Date(0) });
      if(expire){
        const clear = await res.clearCookie('pToken');
        if(clear){
          res.status(200).json( 'token deleted' );
        }
      }
    } catch(err){
      console.log(err)
    }
  }
}