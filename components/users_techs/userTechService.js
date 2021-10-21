const userTech = require('./userTech');

const addTechToUser = (userId, techId) => userTech.create({ userId, techId });

module.exports = { addTechToUser };
