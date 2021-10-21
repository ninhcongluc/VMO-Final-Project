const express = require('express');

const router = express.Router();

const projectTechController = require('./projectTechController');
const auth = require('../auth/authMiddleware');

/**
 * @swagger
 * /projects_techs:
 *   post:
 *     summary: Add new Technology to Project
 *     tags:
 *       - Project Technology
 *     parameters:
 *      - in: formData
 *        name: projectId
 *        required: true
 *        description: The projectId want to add
 *      - in: formData
 *        name: techId
 *        required: true
 *        description: The techId want to add
 *     description: return new project technology added
 *     responses:
 *       200:
 *         description: Project Technology Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post(
  '/projects_techs',
  auth.authAdminMiddleware,
  projectTechController.add
);

/**
 * @swagger
 * /projects_techs:
 *   get:
 *     summary: Get all of project technologies
 *     tags:
 *       - Project Technology
 *     description: Return list of project technologies
 *     responses:
 *       200:
 *         description: Get List of project technologies successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get(
  '/projects_techs',
  auth.authAdminMiddleware,
  projectTechController.getAll
);

module.exports = router;
