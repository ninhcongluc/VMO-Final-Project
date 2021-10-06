const express = require('express');

const router = express.Router();
const Role = require('./role');

router.post('/auth/roles', async (req, res) => {
  const { name } = req.body;
  try {
    const user = await Role.create({ name });
    res.send(user);
  } catch (error) {
    res.send(error.message);
  }
  res.send(name);
});

module.exports = router;
