const express = require("express");
const {
  getAllBooks,
  deleteBook,
  updateBook,
  addBook,
  getBookById,
} = require("../controllers/books.controler");

const router = express.Router();

router.get("/get", getAllBooks);
router.get("/get/:id", getBookById);
router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
