const express = require('express');

const router = express.Router();
const statusController = require('./statusController');
const auth = require('../auth/authMiddleware');

/**
 * @swagger
 * /status:
 *   post:
 *     summary: Create new project status
 *     tags:
 *       - Project Status
 *     parameters:
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the project status to create
 *      - in: formData
 *        name: status
 *        required: false
 *        description: The status of the project status to create
 *     description: return new status added
 *     responses:
 *       200:
 *         description: Status Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post('/status', auth.authMiddleware, statusController.create);
/**
 * @swagger
 * /status:
 *   get:
 *     summary: Get all project status
 *     tags:
 *       - Project Status
 *     description: Return list of status
 *     responses:
 *       200:
 *         description: Get List of status successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/status', auth.authMiddleware, statusController.getAll);
/**
 * @swagger
 * /status/{statusId}:
 *   get:
 *     summary: Get one project status by id
 *     tags:
 *       - Project Status
 *     parameters:
 *      - in: path
 *        name: statusId
 *        required: true
 *        description: The Id of the status to return
 *     description: Return project status object
 *     responses:
 *       200:
 *         description: Get a project status object.
 *       400:
 *         description: Bad Request
 *
 */
router.get('/status/:id', auth.authMiddleware, statusController.getStatusById);

/**
 * @swagger
 * /status/{statusId}:
 *   put:
 *     summary: Update project status by Id
 *     tags:
 *       - Project Status
 *     parameters:
 *      - in: path
 *        name: statusId
 *        required: true
 *        description: The Id of the project status to update
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the project status to update
 *      - in: formData
 *        name: status
 *        required: false
 *        description: The status of the project status to update
 *     description: return updated successfully
 *     responses:
 *       200:
 *         description: UPDATED Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.put('/status/:id', auth.authMiddleware, statusController.updateStatus);

/**
 * @swagger
 * /status/{statusId}:
 *   delete:
 *     summary: Delete a project status by id
 *     tags:
 *       - Project Status
 *     parameters:
 *      - in: path
 *        name: statusId
 *        required: true
 *        description: The Id of the project status to delete
 *     description: Return project status object
 *     responses:
 *       200:
 *         description: DELETE Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.delete(
  '/status/:id',
  auth.authMiddleware,
  statusController.deleteStatus
);

module.exports = router;
