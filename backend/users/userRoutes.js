const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('./userController');
// const { verifyToken } = require('')

router.route('/').post(createUser);
router.route('/').get(getUsers);

module.exports = router;