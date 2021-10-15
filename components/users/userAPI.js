const express = require('express');

const router = express.Router();
const auth = require('../auth/authMiddleware');

const userController = require('./userController');

router.post('/users', auth.authMiddleware, userController.create);
router.get('/users', auth.authMiddleware, userController.getAllUsers);
router.get('/users/:id', auth.authMiddleware, userController.getUserById);

module.exports = router;
