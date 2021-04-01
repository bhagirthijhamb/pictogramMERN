const jwt = require('jsonwebtoken');
const User = require('./userModel');
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
        return res.status(201).json(newUser);
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
      const user = await (await User.findOne({ _id: req.user._id })).select("-password");
      if(user){
        // const userPosts = await Post
      }
    } catch(err){
      console.log(err);
    }
  }
}