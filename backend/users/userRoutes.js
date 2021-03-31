const express = require('express');
const router = express.Router();
const { createUser, getUsers, loginUser } = require('./userController');
// const { verifyToken } = require('')

router.route('/').post(createUser);
router.route('/').get(getUsers);
router.route('/login').post(loginUser);

module.exports = router;