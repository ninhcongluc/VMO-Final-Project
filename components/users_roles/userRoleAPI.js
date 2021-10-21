const express = require('express');

const router = express.Router();

const userRoleController = require('./userRoleController');

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
router.post('/users_roles', userRoleController.add);

module.exports = router;
