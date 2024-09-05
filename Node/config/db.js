// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('yogesh_db', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// module.exports = sequelize;


// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('yogesh_db', 'postgres', 'yogesh', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

// module.exports = sequelize


require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    // Disable SSL for local development
    ssl: false
  },
  // Add logging to see the SQL queries
  logging: console.log
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize; 
