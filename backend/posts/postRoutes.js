const express = require('express');
const router = express.Router();
const { getPosts, createPost, getMyPosts, likePost, unlikePost, commentPost, deletePost, deleteComment, getSubscribedPosts } = require('./../posts/postController');
const { authMiddleware } = require('./../utils/authMiddleware');

router.use(authMiddleware).route('/').post(createPost);
router.use(authMiddleware).route('/').get(getPosts);
router.use(authMiddleware).route('/myPosts').get(getMyPosts);
router.use(authMiddleware).route('/subscribedPosts').get(getSubscribedPosts);
router.use(authMiddleware).route('/like').put(likePost);
router.use(authMiddleware).route('/unlike').put(unlikePost);
router.use(authMiddleware).route('/comment').put(commentPost);
router.use(authMiddleware).route('/deletePost/:postId').delete(deletePost);
router.use(authMiddleware).route('/deleteComment/:postId/:commentId').delete(deleteComment);

module.exports = router;
