const express = require('express');
const router = express.Router();
const { createUser, getUsers, loginUser, getMyDetails, getUserDetails, logoutUser } = require('./userController');
const { authMiddleware } = require('./../utils/authMiddleware');

router.route('/').post(createUser);
router.route('/').get(getUsers);
router.route('/login').post(loginUser);
router.use(authMiddleware).route('/me').get(getMyDetails);
// router.use(authMiddleware).route('/myProfile').get(getMyProfile);
router.use(authMiddleware).route('/logout').get(logoutUser)
router.use(authMiddleware).route('/user/:userId').get(getUserDetails);

module.exports = router;