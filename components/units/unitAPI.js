const express = require('express');

const router = express.Router();
const unitController = require('./unitController');

router.post('/units', unitController.createUnit);
router.get('/units', unitController.getAll);

module.exports = router;
