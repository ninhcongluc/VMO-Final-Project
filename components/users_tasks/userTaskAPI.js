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

module.exports = router;
