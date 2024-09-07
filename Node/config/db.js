// // const Sequelize = require('sequelize');

// // const sequelize = new Sequelize('yogesh_db', 'root', '', {
// //   host: 'localhost',
// //   dialect: 'mysql',
// // });

// // module.exports = sequelize;


// // const Sequelize = require('sequelize');

// // const sequelize = new Sequelize('yogesh_db', 'postgres', 'yogesh', {
// //   host: 'localhost',
// //   dialect: 'postgres',
// // });

// // module.exports = sequelize


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


// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// let sequelize;

// if (process.env.NODE_ENV === 'production') {
//   sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     },
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   });
// } else {
//   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'postgres',
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   });
// }

// module.exports = sequelize;
// // Test the connection
// sequelize.authenticate()
//   .then(() => console.log('Database connection has been established successfully.'))
//   .catch(err => console.error('Unable to connect to the database:', err));

// module.exports = sequelize;


require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
}

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err.message));

module.exports = sequelize;
