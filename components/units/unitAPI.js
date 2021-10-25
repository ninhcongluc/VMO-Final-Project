const express = require('express');

const router = express.Router();
const auth = require('../auth/authMiddleware');
const unitController = require('./unitController');

/**
 * @swagger
 * /units:
 *   post:
 *     summary: Create new unit
 *     tags:
 *       - Unit
 *     parameters:
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the unit to create
 *      - in: formData
 *        name: description
 *        required: true
 *        description: The description of the unit to create
 *      - in: formData
 *        name: managerId
 *        required: false
 *        description: The manager of the unit to create
 *     description: return new unit
 *     responses:
 *       200:
 *         description: Unit Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post('/units', auth.authAdminMiddleware, unitController.createUnit);

/**
 * @swagger
 * /units:
 *   get:
 *     summary: Get all units
 *     tags:
 *       - Unit
 *     description: Return list of units
 *     responses:
 *       200:
 *         description: Get List of units successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/units', auth.authMiddleware, unitController.getAll);

/**
 * @swagger
 * /units/{unitId}:
 *   get:
 *     summary: Get one Unit by id
 *     tags:
 *       - Unit
 *     parameters:
 *      - in: path
 *        name: unitId
 *        required: true
 *        description: The Id of the unit to return
 *     description: Return unit object
 *     responses:
 *       200:
 *         description: Get a unit object.
 *       400:
 *         description: Bad Request
 *
 */
router.get('/units/:id', auth.authMiddleware, unitController.getUnitById);

/**
 * @swagger
 * /units/users/{unitId}:
 *   get:
 *     summary: get a list of users with the same unit by id
 *     tags:
 *       - Unit
 *     parameters:
 *      - in: path
 *        name: unitId
 *        required: true
 *        description: The Id of the unit to return
 *     description: Return list of users with the same unit by id
 *     responses:
 *       200:
 *         description: Get a list of users.
 *       400:
 *         description: Bad Request
 *
 */
router.get(
  '/units/users/:id',
  auth.authMiddleware,
  unitController.getUserByUnit
);

/**
 * @swagger
 * /units/projects/{unitId}:
 *   get:
 *     summary: get a list of projects with the same unit by id
 *     tags:
 *       - Unit
 *     parameters:
 *      - in: path
 *        name: unitId
 *        required: true
 *        description: The Id of the unit to return
 *     description: Return list of projects with the same unit by id
 *     responses:
 *       200:
 *         description: Get a list of projects.
 *       400:
 *         description: Bad Request
 *
 */
router.get(
  '/units/projects/:id',
  auth.authMiddleware,
  unitController.getProjectByUnit
);

/**
 * @swagger
 * /units/{unitId}:
 *   put:
 *     summary: Update unit by Id
 *     tags:
 *       - Unit
 *     parameters:
 *      - in: path
 *        name: unitId
 *        required: true
 *        description: The Id of the unit to update
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the unit to update
 *      - in: formData
 *        name: description
 *        required: true
 *        description: The description of the unit to update
 *      - in: formData
 *        name: managerId
 *        required: false
 *     description: return updated successfully
 *     responses:
 *       200:
 *         description: UPDATED Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.put('/units/:id', auth.authAdminMiddleware, unitController.updateUnit);

/**
 * @swagger
 * /units/{unitId}:
 *   delete:
 *     summary: Delete a unit by id
 *     tags:
 *       - Unit
 *     parameters:
 *      - in: path
 *        name: unitId
 *        required: true
 *        description: The Id of the unit to delete
 *     description: Return unit object
 *     responses:
 *       200:
 *         description: DELETE Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.delete(
  '/units/:id',
  auth.authAdminMiddleware,
  unitController.deleteUnit
);

module.exports = router;
