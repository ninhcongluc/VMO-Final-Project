const express = require('express');

const router = express.Router();
const projectController = require('./projectController');
const auth = require('../auth/authMiddleware');

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create new project
 *     tags:
 *       - Project
 *     parameters:
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the project to create
 *      - in: formData
 *        name: description
 *        required: true
 *        description: The description of the project  to create
 *      - in: formData
 *        name: typeId
 *        required: false
 *        description: The type of the project to create
 *      - in: formData
 *        name: statusId
 *        required: false
 *        description: The status of the project to create
 *      - in: formData
 *        name: startDate
 *        required: true
 *        description: The start date of the project
 *      - in: formData
 *        name: endDate
 *        required: true
 *        description: The end date of the project
 *      - in: formData
 *        name: unitId
 *        required: false
 *        description: The Unit of the project
 *      - in: formData
 *        name: customerId
 *        required: false
 *        description: The customer of the project
 *     description: return new project added
 *     responses:
 *       200:
 *         description: Project Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post(
  '/projects',
  auth.authAdminMiddleware,
  projectController.createProject
);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all project
 *     tags:
 *       - Project
 *     description: Return list of projects
 *     responses:
 *       200:
 *         description: Get List of projects successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/projects', auth.authMiddleware, projectController.getAll);

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Get one project by id
 *     tags:
 *       - Project
 *     parameters:
 *      - in: path
 *        name: projectId
 *        required: true
 *        description: The Id of the project to return
 *     description: Return project object
 *     responses:
 *       200:
 *         description: Get a project object.
 *       400:
 *         description: Bad Request
 *
 */
router.get(
  '/projects/:id',
  auth.authMiddleware,
  projectController.getProjectById
);

module.exports = router;
