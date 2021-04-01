const express = require('express');
const router = express.Router();
const { getPosts, createPost, getMyPosts } = require('./../posts/postController');
const { authMiddleware } = require('./../utils/authMiddleware');

router.use(authMiddleware).route('/').get(getPosts);
router.use(authMiddleware).route('/').post(createPost)
router.use(authMiddleware).route('/myPosts').get(getMyPosts)

module.exports = router;
