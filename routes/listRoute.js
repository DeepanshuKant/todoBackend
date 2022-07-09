const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth')
const { createList, getAllList, updateList, deleteList } = require('../controllers/listController')

const router = express.Router();

router.route('/list/:id').get(getAllList);
router.route('/list/new/:id').post(createList);
router.route('/list/delete/:id').delete(deleteList);

module.exports = router;