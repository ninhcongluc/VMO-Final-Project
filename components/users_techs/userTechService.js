const userTech = require('./userTech');

const addTechToUser = (userId, techId) => userTech.create({ userId, techId });
const findAll = () => userTech.findAll();

module.exports = { addTechToUser, findAll };
