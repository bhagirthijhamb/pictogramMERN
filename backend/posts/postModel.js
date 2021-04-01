const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const CommentSchema = new Schema({
    text: String,
    postedBy: { type: ObjectId, ref: "User"}
})

const postSchema = new Schema({
    text: String,
    author: { type: ObjectId, ref: "User" },
    imageUrl: { type: String, required: true},
    likes: [{ type: ObjectId, ref: "User"}],
    comments: [CommentSchema],
})

module.exports = mongoose.model('Post', postSchema);