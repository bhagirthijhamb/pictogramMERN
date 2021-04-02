const express = require('express');
const router = express.Router();
const { getPosts, createPost, getMyPosts, likePost, unlikePost } = require('./../posts/postController');
const { authMiddleware } = require('./../utils/authMiddleware');

router.use(authMiddleware).route('/').get(getPosts);
router.use(authMiddleware).route('/').post(createPost);
router.use(authMiddleware).route('/myPosts').get(getMyPosts);
router.use(authMiddleware).route('/like').put(likePost);
router.use(authMiddleware).route('/unlike').put(unlikePost);

module.exports = router;
