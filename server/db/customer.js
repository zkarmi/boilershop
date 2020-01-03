const Sequelize = require('sequelize');
const db = require('./db');

const Customer = db.define('customer', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    isEmail: true
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default-customer.jpg'
  }
});

module.exports = Customer;
