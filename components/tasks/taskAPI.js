const express = require('express');

const router = express.Router();
const taskController = require('./taskController');
const auth = require('../auth/authMiddleware');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all task
 *     tags:
 *       - Task
 *     description: Return list of tasks
 *     responses:
 *       200:
 *         description: Get list of tasks successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/tasks', auth.authMiddleware, taskController.getAll);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create new task
 *     tags:
 *       - Task
 *     parameters:
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the task to create
 *      - in: formData
 *        name: description
 *        required: true
 *        description: The description of the task  to create
 *      - in: formData
 *        name: projectId
 *        required: true
 *        description: The task of the project to create
 *      - in: formData
 *        name: startDate
 *        required: true
 *        description: The start date of the task
 *      - in: formData
 *        name: endDate
 *        required: true
 *        description: The end date of the task
 *     description: return new task added
 *     responses:
 *       200:
 *         description: Task Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post('/tasks', auth.authMiddleware, taskController.createTask);

module.exports = router;
