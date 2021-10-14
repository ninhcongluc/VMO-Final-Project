const express = require('express');

const router = express.Router();
const projectController = require('./projectController');

router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getAll);

module.exports = router;
