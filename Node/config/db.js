const Sequelize = require('sequelize');

const sequelize = new Sequelize('yogesh_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
