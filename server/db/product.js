const Sequelize = require("sequelize");
const db = require("./db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "default-customer.jpg"
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  price: {
    type: Sequelize.FLOAT
  },
  quantity: {
    type: Sequelize.INTEGER
  }
});

module.exports = Product;
