const express = require('express')
const { registerUser, loginUser, getSingleUserList, logoutUser } = require('../controllers/userController')
const { isAuthenticatedUser } = require('../middleware/auth')

const router = express.Router();

router.route('/user/register').post(registerUser)
router.route('/user/login').post(loginUser);
router.route('/user/logout').get(logoutUser);
router.route('/user').get(isAuthenticatedUser, getSingleUserList);
module.exports = router;