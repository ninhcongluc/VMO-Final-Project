const express = require('express');

const router = express.Router();
const auth = require('../auth/authMiddleware');

const userController = require('./userController');

router.post('/users', auth.authAdminMiddleware, userController.create);
router.get('/users', auth.authAdminMiddleware, userController.getAllUsers);

module.exports = router;
