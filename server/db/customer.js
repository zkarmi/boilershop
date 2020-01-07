const Sequelize = require("sequelize");
const _ = require("lodash");
const crypto = require("crypto");
const db = require("./db");

const Customer = db.define(
  "customer",
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true,
      isEmail: true,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    salt: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "default-customer.jpg"
    },
    googleId: {
      type: Sequelize.STRING
    }
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword
    }
  }
);

// instance methods
Customer.prototype.correctPassword = function(candidatePassdword) {
  return (
    Customer.encryptPassword(candidatePassdword, this.salt) === this.password
  );
};

Customer.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ["password", "salt"]);
};

// class methods
Customer.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

Customer.encryptPassword = function(plainText, salt) {
  const hash = crypto.createHash("sha1"); // create hash object
  hash.update(plainText); // add plain password to hash object
  hash.update(salt); // add salt to hash object
  return hash.digest("hex"); // digest plainText and salt into a hexadecimal hash
};

// we will call this helper function to salt and hash when:
// 1. user creates password for the first time
// 2. user updates their password
function setSaltAndPassword(customer) {
  if (customer.changed("password")) {
    customer.salt = Customer.generateSalt();
    customer.password = Customer.encryptPassword(
      customer.password,
      customer.salt
    );
  }
}

module.exports = Customer;
