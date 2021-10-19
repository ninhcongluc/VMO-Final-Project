const express = require('express');

const authController = require('./authController');

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login with email and password
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: formData
 *        name: username
 *        required: true
 *        description: Input your email to login
 *      - in: formData
 *        name: password
 *        required: true
 *        description: Input your password to login
 *     description: User input username and password to access system
 *     responses:
 *       200:
 *         description: Login Successfully
 *       400:
 *         description: Bad Request
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Fill email to find forgot account
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: formData
 *        name: email
 *        required: true
 *        description: Input your email to find
 *     description: User input email, server send link change password to email address
 *     responses:
 *       200:
 *         description: Send link change password successfully
 *       400:
 *         description: Bad Request
 */
router.post('/verify', authController.verifyEmail);

/**
 * @swagger
 * /change_pass:
 *   post:
 *     summary: Fill new password to change account
 *     tags:
 *       - Auth
 *     parameters:
 *      - in: formData
 *        name: id
 *        required: true
 *        description: Input id of user you want to change password
 *      - in: formData
 *        name: newPassword
 *        required: true
 *        description: Input new password
 *      - in: formData
 *        name: confirmPassword
 *        required: true
 *        description: Input confirm password
 *     description: User input new password and confirm password to change password
 *     responses:
 *       200:
 *         description: Reset password successfully
 *       400:
 *         description: Bad Request
 */
router.post('/change_pass', authController.changePassword);

module.exports = router;
