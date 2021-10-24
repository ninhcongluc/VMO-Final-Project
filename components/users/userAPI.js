const express = require('express');

const router = express.Router();
const auth = require('../auth/authMiddleware');

const userController = require('./userController');

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user
 *     tags:
 *       - User
 *     parameters:
 *      - in: formData
 *        name: username
 *        required: true
 *        description: Email you want to register
 *      - in: formData
 *        name: password
 *        required: true
 *        description: Password you want to register
 *      - in: formData
 *        name: name
 *        required: true
 *        description: Name you want to register
 *     description: return message user added successfully
 *     responses:
 *       200:
 *         description: User Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post('/users', auth.authAdminMiddleware, userController.create);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - User
 *     description: Return list of users
 *     responses:
 *       200:
 *         description: Get list of users successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/users', auth.authMiddleware, userController.getAllUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get one user by id
 *     tags:
 *       - User
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: The Id of the user to return
 *     description: Return user object
 *     responses:
 *       200:
 *         description: Get a user object.
 *       400:
 *         description: Bad Request
 *
 */
router.get('/users/:id', auth.authMiddleware, userController.getUserById);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a  user by id
 *     tags:
 *       - User
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: The Id of the  user to delete
 *     description: User input user with id to delete this user
 *     responses:
 *       200:
 *         description: DELETE Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.delete(
  '/users/:id',
  auth.authAdminMiddleware,
  userController.deleteUser
);

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update user by Id
 *     tags:
 *       - User
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: The Id of the user to update
 *     description: return updated successfully
 *     responses:
 *       200:
 *         description: UPDATED Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.put('/users/:id', auth.authAdminMiddleware, userController.updateUser);

module.exports = router;
