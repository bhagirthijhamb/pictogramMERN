const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require('bcryptjs');

// userSchema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, default: 'https://res.cloudinary.com/dbagdzszp/image/upload/v1607520695/no-img_lxsyee.png'},
  website: { type: String, default: ''},
  bio: { type: String, default: ''},
  password: { type: String, required: true },
  followers: [{ type: ObjectId, ref: "User"}],
  following: [{ type: ObjectId, ref: "User"}]
})

userSchema.pre('save', async function(next) {
  // this is the document (user object) that we are trying to save
  const user = this; 

  if(user.isModified('password') || user.isNew) {
    try {
      const hash = await bcrypt.hash(user.password, 12);
      user.password = hash;
    } catch(err) {
        return next(err);
    }
  } else {
    return next(err);
  }
})

userSchema.methods.comparePasswords = function(password) {
  // return bcrypt.compare(password, this.password)
  const user = this;
  return bcrypt.compare(password, user.password);
}

module.exports = mongoose.model('User', userSchema);