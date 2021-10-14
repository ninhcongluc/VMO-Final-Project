const express = require('express');

const router = express.Router();
const techController = require('./techController');

router.post('/technologies', techController.create);
router.get('/technologies', techController.getAll);

module.exports = router;
