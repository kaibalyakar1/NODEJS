const express = require("express");
const {
  insertProduct,
  getProducts,
} = require("../controllers/product.controller");
const router = express.Router();

router.post("/insert", insertProduct);
router.get("/get", getProducts);

module.exports = router;
