const router = require("express").Router();

// router.use("/customers", require("./customers"));
// router.use("/products", require("./products"));
// router.use("/orders", require("./orders"));

router.use(function(req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
