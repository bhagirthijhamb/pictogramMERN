const User = require('./userModel');
const { validateSignupData } = require('./../utils/validators');

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
  getUsers: async (req,res) => {
    try {
      const users = await User.find();
      if(users){
        res.status(200).send(users);
      }
    } catch(err){
      console.log(err);
      res.status(500).json({ general: "Something went wrong, please try again"})
    }
  }
}