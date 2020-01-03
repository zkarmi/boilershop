const Sequelize = require('sequelize');
const db = require('./db');

const Order = db.define('order', {
  products: {
    type: Sequelize.ARRAY(Sequelize.INTEGER) // ideally, this should be another table
  },
  status: {
    type: Sequelize.ENUM('Pending', 'Processing', 'Canceled', 'Complete')
  },
  shippingMethod: {
    type: Sequelize.ENUM('Ground', 'Express')
  },
  paymentMethod: {
    type: Sequelize.ENUM('Credit Card', 'PayPal', 'Bitcoin')
  }
});

module.exports = Order;
