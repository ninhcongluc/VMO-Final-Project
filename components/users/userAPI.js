const express = require('express');

const router = express.Router();
const auth = require('../auth/authMiddleware');

const userController = require('./userController');

router.post('/users', auth.authMiddleware, userController.create);
router.get('/users', auth.authMiddleware, userController.getAllUsers);

module.exports = router;
