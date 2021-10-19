const express = require('express');

const router = express.Router();

const roleController = require('./roleController');
const auth = require('../auth/authMiddleware');

router.post('/roles', auth.authMiddleware, roleController.createRole);
router.get('/roles', auth.authMiddleware, roleController.getAll);

module.exports = router;
