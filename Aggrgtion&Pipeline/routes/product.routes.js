const express = require("express");
const {
  insertProduct,
  getProducts,
  getAnalytics,
  createAuthor,
  createBook,
  getAuthorwithbook,
} = require("../controllers/product.controller");

const router = express.Router();
router.post("/author", createAuthor);
router.post("/book", createBook);
router.get("/author/:id", getAuthorwithbook);

router.post("/insert", insertProduct);
router.get("/get", getProducts);
router.get("/get-analytics", getAnalytics);

module.exports = router;
