/* eslint-disable nonblock-statement-body-position */
const router = require("express").Router();
const Sequelize = require("sequelize");
// router.use("/customers", require("./customers"));
// router.use("/products", require("./products"));
// router.use("/orders", require("./orders"));

const { Product } = require("../db/product");

router.get("/allProducts", async (req, res, next) => {
  try {
    const allProducts = await Product.findAll();
    res.send(allProducts);
  } catch (error) {
    next(error);
  }
});

router.use(function(req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
