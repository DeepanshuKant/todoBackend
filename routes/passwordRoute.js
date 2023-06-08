const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth')
const { createPassword, getAllPassword, updatePassword, deletePassword, deleteAllPasswords } = require('../controllers/passwordController')

const router = express.Router();

router.route('/password/:id').get(getAllPassword);
router.route('/password/new/:id').post(createPassword);
router.route('/password/delete/:id').delete(deletePassword);
router.route('/password/deleteall/:id').delete(deleteAllPasswords);

module.exports = router;