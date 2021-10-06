const express = require('express');

const router = express.Router();

const userRoleController = require('./userRoleController');

// add role to user
router.post('/users_roles', userRoleController.add);

module.exports = router;
