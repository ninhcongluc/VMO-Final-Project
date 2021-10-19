const express = require('express');

const router = express.Router();
const techController = require('./techController');
const auth = require('../auth/authMiddleware');

/**
 * @swagger
 * /technologies:
 *   post:
 *     summary: Create new technology
 *     tags:
 *       - Technology
 *     parameters:
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the technology to create
 *      - in: formData
 *        name: status
 *        required: false
 *        description: The status of the technique to create
 *     description: return new technology added
 *     responses:
 *       200:
 *         description: Technology Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post('/technologies', auth.authMiddleware, techController.create);
/**
 * @swagger
 * /technologies:
 *   get:
 *     summary: Get all of technologies
 *     tags:
 *       - Technology
 *     description: Return list of technologies
 *     responses:
 *       200:
 *         description: Get List of technology successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/technologies', auth.authMiddleware, techController.getAll);
/**
 * @swagger
 * /technologies/{technologyId}:
 *   get:
 *     summary: Get one technology by id
 *     tags:
 *       - Technology
 *     parameters:
 *      - in: path
 *        name: technologyId
 *        required: true
 *        description: The Id of the technology to return
 *     description: Return technology object
 *     responses:
 *       200:
 *         description: Get a technology object.
 *       400:
 *         description: Bad Request
 *
 */
router.get(
  '/technologies/:id',
  auth.authMiddleware,
  techController.getTechById
);

/**
 * @swagger
 * /technologies/{technologyId}:
 *   put:
 *     summary: Update technology by Id
 *     tags:
 *       - Technology
 *     parameters:
 *      - in: path
 *        name: technologyId
 *        required: true
 *        description: The Id of the technology to update
 *      - in: formData
 *        name: name
 *        required: true
 *        description: The name of the technology to update
 *      - in: formData
 *        name: status
 *        required: false
 *        description: The status of the technology to update
 *     description: return updated successfully
 *     responses:
 *       200:
 *         description: UPDATED Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.put('/technologies/:id', auth.authMiddleware, techController.updateTech);

/**
 * @swagger
 * /technologies/{technologyId}:
 *   delete:
 *     summary: Delete a technology by id
 *     tags:
 *       - Technology
 *     parameters:
 *      - in: path
 *        name: technologyId
 *        required: true
 *        description: The Id of the technology to delete
 *     description: Return album object
 *     responses:
 *       200:
 *         description: DELETE Successfully.
 *       400:
 *         description: Bad Request
 *
 */
router.delete(
  '/technologies/:id',
  auth.authMiddleware,
  techController.deleteTech
);

module.exports = router;
