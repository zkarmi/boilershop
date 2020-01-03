const Sequelize = require('sequelize');

// if we're using heroku, use environment var
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilershop',
  {
    logging: false
  }
);

module.exports = db;
