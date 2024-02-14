const Sequelize = require('sequelize');

const sequelize = new Sequelize('yogesh_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;


// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('yogesh_db', 'postgres', 'yogesh', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

// module.exports = sequelize
