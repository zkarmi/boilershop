const db = require('./db');

// require models
const Customer = require('./customer');
const Product = require('./product');
const Order = require('./order');

// associations
Customer.hasMany(Order);
Order.belongsTo(Customer);

Order.hasMany(Product)
Product.belongsToMany(Order, { through: 'OrderProduct' });

module.exports = {
  db,
  Customer,
  Product,
  Order
}
