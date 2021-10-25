const express = require('express');

const router = express.Router();

const userTechController = require('./userTechController');
const auth = require('../auth/authMiddleware');

/**
 * @swagger
 * /users_techs:
 *   post:
 *     summary: add tech to user
 *     tags:
 *       - User Tech
 *     parameters:
 *      - in: formData
 *        name: userId
 *        required: true
 *        description: userId you want to add technique
 *      - in: formData
 *        name: techId
 *        required: true
 *        description: techId you want to add
 *     description: return user tech object
 *     responses:
 *       200:
 *         description: User Tech Added Successfully.
 *       400:
 *         description: Bad Request
 */
router.post(
  '/users_techs',
  auth.authAdminMiddleware,
  userTechController.createUserTech
);

/**
 * @swagger
 * /users_techs:
 *   get:
 *     summary: Get list technologies of users
 *     tags:
 *       - User Tech
 *     description: Return list of technologies of users
 *     responses:
 *       200:
 *         description: Get List of technologies of users successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       400:
 *           description: Bad request
 *
 */
router.get('/users_techs', auth.authAdminMiddleware, userTechController.getAll);

module.exports = router;
