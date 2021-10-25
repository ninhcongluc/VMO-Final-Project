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
router.get('/tasks', auth.authManagerEmployeeMiddleware, taskController.getAll);

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
router.post('/tasks', auth.authManagerMiddleware, taskController.createTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     summary: Get task by id
 *     tags:
 *       - Task
 *     parameters:
 *      - in: path
 *        name: taskId
 *        required: true
 *        description: The Id of the task to return
 *     description: Return task object
 *     responses:
 *       200:
 *         description: Get a task object.
 *       400:
 *         description: Bad Request
 *
 */
router.get(
  '/tasks/:id',
  auth.authManagerEmployeeMiddleware,
  taskController.getTaskById
);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update task by Id
 *     tags:
 *       - Task
 *     parameters:
 *      - in: path
 *        name: taskId
 *        required: true
 *        description: The Id of the task to update
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the task to update
 *      - in: formData
 *        name: description
 *        required: true
 *        description: The description of the task to update
 *      - in: formData
 *        name: projectId
 *        required: true
 *        description: The project of the task to update
 *      - in: formData
 *        name: startDate
 *        required: true
 *        description: The start date of the task to update
 *      - in: formData
 *        name: endDate
 *        required: true
 *        description: The end date of the task to update
 *     description: return updated successfully
 *     responses:
 *       200:
 *         description: UPDATED Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.put('/tasks/:id', auth.authManagerMiddleware, taskController.updateTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Delete a task by id
 *     tags:
 *       - Task
 *     parameters:
 *      - in: path
 *        name: taskId
 *        required: true
 *        description: The Id of the task to delete
 *     description: Return message delete successful
 *     responses:
 *       200:
 *         description: DELETE Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.delete(
  '/tasks/:id',
  auth.authManagerMiddleware,
  taskController.deleteTask
);

module.exports = router;
