const BooksModels = require("../models/Books.models");

const getAllBooks = async (req, res) => {
  try {
    const books = await BooksModels.find();
    res.status(200).json(books);
  } catch (error) {
    console.log("Error getting all books: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BooksModels.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log("Error getting book by id: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, price, year } = req.body;
    const book = new BooksModels({
      title,
      author,
      price,
      year,
    });
    await book.save();
    res
      .status(201)
      .json({ success: true, message: "Book added successfully", book });
  } catch (error) {
    console.log("Error adding book: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price, year } = req.body;
    const book = await BooksModels.findById(id);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    book.title = title;
    book.author = author;
    book.price = price;
    book.year = year;
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error updating book: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BooksModels.findByIdAndDelete(id);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error deleting book: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
};
