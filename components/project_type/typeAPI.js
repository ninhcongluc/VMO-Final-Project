const express = require('express');

const router = express.Router();
const typeController = require('./typeController');
const auth = require('../auth/authMiddleware');

/**
 * @swagger
 * /types:
 *   post:
 *     summary: Create new project type
 *     tags:
 *       - Project Type
 *     parameters:
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the project type to create
 *      - in: formData
 *        name: status
 *        required: false
 *        description: The status of the project type to create
 *     description: return new type added
 *     responses:
 *       200:
 *         description: Type Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post('/types', auth.authAdminMiddleware, typeController.create);
/**
 * @swagger
 * /types:
 *   get:
 *     summary: Get all project types
 *     tags:
 *       - Project Type
 *     description: Return list of types
 *     responses:
 *       200:
 *         description: Get List of types successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/types', auth.authMiddleware, typeController.getAll);
/**
 * @swagger
 * /types/{typeId}:
 *   get:
 *     summary: Get one project type by id
 *     tags:
 *       - Project Type
 *     parameters:
 *      - in: path
 *        name: typeId
 *        required: true
 *        description: The Id of the type to return
 *     description: Return project type object
 *     responses:
 *       200:
 *         description: Get a project type object.
 *       400:
 *         description: Bad Request
 *
 */
router.get('/types/:id', auth.authMiddleware, typeController.getTypeById);

/**
 * @swagger
 * /types/{typeId}:
 *   put:
 *     summary: Update project type by Id
 *     tags:
 *       - Project Type
 *     parameters:
 *      - in: path
 *        name: typeId
 *        required: true
 *        description: The Id of the project type to update
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the project type to update
 *      - in: formData
 *        name: status
 *        required: false
 *        description: The status of the project type to update
 *     description: return updated successfully
 *     responses:
 *       200:
 *         description: UPDATED Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.put('/types/:id', auth.authAdminMiddleware, typeController.updateType);

/**
 * @swagger
 * /types/{typeId}:
 *   delete:
 *     summary: Delete a project type by id
 *     tags:
 *       - Project Type
 *     parameters:
 *      - in: path
 *        name: typeId
 *        required: true
 *        description: The Id of the project type to delete
 *     description: Return project type object
 *     responses:
 *       200:
 *         description: DELETE Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.delete(
  '/status/:id',
  auth.authAdminMiddleware,
  typeController.deleteType
);

module.exports = router;
