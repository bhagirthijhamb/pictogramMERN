const jwt = require('jsonwebtoken');
const User = require('./userModel');
const { validateSignupData, validateLoginData } = require('./../utils/validators');

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
      const user = await User.find({ email: email });
      
      if(!user){
        res.status(400).json({ message: "Invalid email or password" });
        return;
      } else {
        const token = createToken({ id: user._id });
        console.log(token);
        res.cookie('token', token);
        res.status(200).send(user);
      }
    } catch(err){
      console.log(err);
    }
  }
}