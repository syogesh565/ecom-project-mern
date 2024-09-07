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


// require('dotenv').config();
// const Sequelize = require('sequelize');

// let sequelize;

// if (process.env.NODE_ENV === 'production') {
//   sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     }
//   });
// } else {
//   sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres'
//   });
// }

// module.exports = sequelize;


const Sequelize = require('sequelize');
require('dotenv').config(); // Make sure to load environment variables

// Use DATABASE_URL from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // For development, set to true in production
    },
  },
});

module.exports = sequelize;
