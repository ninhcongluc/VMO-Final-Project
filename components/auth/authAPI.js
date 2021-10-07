const express = require('express');

const authController = require('./authController');

const router = express.Router();

router.post('/login', authController.login);

router.post('/verify', authController.verifyEmail);

router.post('/change_pass', authController.changePassword);

module.exports = router;
