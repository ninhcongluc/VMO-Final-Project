const express = require('express');

const router = express.Router();

const userTaskController = require('./userTaskController');
const auth = require('../auth/authMiddleware');
/**
 * @swagger
 * /users_tasks:
 *   post:
 *     summary: add task to user
 *     tags:
 *       - User Task
 *     parameters:
 *      - in: formData
 *        name: userId
 *        required: true
 *        description: userId you want to add task
 *      - in: formData
 *        name: taskId
 *        required: true
 *        description: taskId you want to add
 *     description: return user task object
 *     responses:
 *       200:
 *         description: User Task Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post(
  '/users_tasks',
  auth.authManagerMiddleware,
  userTaskController.createUserTask
);

/**
 * @swagger
 * /users_tasks:
 *   get:
 *     summary: Get list tasks of users
 *     tags:
 *       - User Task
 *     description: Return list of tasks of users
 *     responses:
 *       200:
 *         description: Get List tasks of users successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get(
  '/users_tasks',
  auth.authManagerMiddleware,
  userTaskController.getAll
);

module.exports = router;
