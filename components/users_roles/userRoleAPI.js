const express = require('express');

const router = express.Router();

const userRoleController = require('./userRoleController');
const auth = require('../auth/authMiddleware');

/**
 * @swagger
 * /users_roles:
 *   post:
 *     summary: add role to user
 *     tags:
 *       - User Role
 *     parameters:
 *      - in: formData
 *        name: userId
 *        required: true
 *        description: userId you want to add role
 *      - in: formData
 *        name: roleId
 *        required: true
 *        description: roleId you want to add
 *     description: return user role object
 *     responses:
 *       200:
 *         description: User Role Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post('/users_roles', auth.authAdminMiddleware, userRoleController.add);

/**
 * @swagger
 * /users_roles:
 *   get:
 *     summary: Get all user roles
 *     tags:
 *       - User Role
 *     description: Return list of user roles
 *     responses:
 *       200:
 *         description: Get list of user roles successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/users_roles', auth.authAdminMiddleware, userRoleController.getAll);

/**
 * @swagger
 * /users_roles/{userId}:
 *   delete:
 *     summary: Delete role of user by userId
 *     tags:
 *       - User Role
 *     parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        description: The Id of the  user to delete
 *     description: User input userId to delete role of user
 *     responses:
 *       200:
 *         description: DELETE Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.delete(
  '/users_roles/:userId',
  auth.authAdminMiddleware,
  userRoleController.deleteUserRole
);
module.exports = router;
