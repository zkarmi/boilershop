const Sequelize = require("sequelize");
const db = require("./db");

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("Pending", "Processing", "Canceled", "Complete")
  },
  shippingMethod: {
    type: Sequelize.ENUM("Ground", "Express")
  },
  paymentMethod: {
    type: Sequelize.ENUM("Credit Card", "PayPal", "Bitcoin")
  }
});

module.exports = Order;
