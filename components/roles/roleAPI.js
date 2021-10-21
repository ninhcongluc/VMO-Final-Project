const express = require('express');

const router = express.Router();

const roleController = require('./roleController');
const auth = require('../auth/authMiddleware');

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create new role
 *     tags:
 *       - Role
 *     parameters:
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the role to create
 *     description: return new role added
 *     responses:
 *       200:
 *         description: Role Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post('/roles', auth.authAdminMiddleware, roleController.createRole);

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all of roles
 *     tags:
 *       - Role
 *     description: Return list of roles
 *     responses:
 *       200:
 *         description: Get List of roles successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/roles', auth.authAdminMiddleware, roleController.getAll);

/**
 * @swagger
 * /roles/{roleId}:
 *   get:
 *     summary: Get role by id
 *     tags:
 *       - Role
 *     parameters:
 *      - in: path
 *        name: roleId
 *        required: true
 *        description: The Id of the role to return
 *     description: Return role object
 *     responses:
 *       200:
 *         description: Get a role object.
 *       400:
 *         description: Bad Request
 *
 */
router.get('/roles/:id', auth.authAdminMiddleware, roleController.getRoleById);

/**
 * @swagger
 * /roles/{roleId}:
 *   put:
 *     summary: Update role by Id
 *     tags:
 *       - Role
 *     parameters:
 *      - in: path
 *        name: roleId
 *        required: true
 *        description: The Id of the role to update
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the role to update
 *     description: return updated successfully
 *     responses:
 *       200:
 *         description: UPDATED Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.put('/roles/:id', auth.authAdminMiddleware, roleController.updateRole);

/**
 * @swagger
 * /roles/{roleId}:
 *   delete:
 *     summary: Delete a role by id
 *     tags:
 *       - Role
 *     parameters:
 *      - in: path
 *        name: roleId
 *        required: true
 *        description: The Id of the role to delete
 *     description: Return message delete successful
 *     responses:
 *       200:
 *         description: DELETE Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.delete(
  '/roles/:id',
  auth.authAdminMiddleware,
  roleController.deleteRole
);

module.exports = router;
