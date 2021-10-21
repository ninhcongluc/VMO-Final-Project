const express = require('express');

const router = express.Router();

const userTechController = require('./userTechController');

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
router.post('/users_techs', userTechController.createUserTech);

module.exports = router;
