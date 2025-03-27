const author = require("../models/author");
const books = require("../models/books");
const product = require("../models/product");

const insertProduct = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Laptop",
        category: "Electronics",
        price: 999,
        inStock: true,
        tags: ["computer", "tech"],
      },
      {
        name: "Smartphone",
        category: "Electronics",
        price: 699,
        inStock: true,
        tags: ["mobile", "tech"],
      },
      {
        name: "Headphones",
        category: "Electronics",
        price: 199,
        inStock: false,
        tags: ["audio", "tech"],
      },
      {
        name: "Running Shoes",
        category: "Sports",
        price: 89,
        inStock: true,
        tags: ["footwear", "running"],
      },
      {
        name: "Novel",
        category: "Books",
        price: 15,
        inStock: true,
        tags: ["fiction", "bestseller"],
      },
    ];
    const result = await product.insertMany(sampleProducts);
    res.status(200).json({
      success: true,
      message: "Products inserted successfully",
      data: `Inserted ${result.length} products`,
    });
  } catch (error) {
    console.log("Error inserting product: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const price = Number(req.query.price) || 0;
    console.log("Price:", price);
    const products = await product.aggregate([
      {
        //stage 1
        $match: {
          inStock: "true",
          price: { $gt: price },
        },
      },
      {
        //stage 2

        $group: {
          _id: "$category",
          avgPrice: { $avg: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(products);
  } catch (error) {
    console.log("Error getting products: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const category = req.query.category || "";

    const analytics = await product.aggregate([
      {
        $match: {
          category: category,
        },
      },
      {
        $group: {
          _id: null,
          avgPrice: { $avg: "$price" },
          totalProducts: { $sum: 1 },
          totalRevenue: { $sum: "$price" },
          maxProductPrice: { $max: "$price" },
          minProductPrice: { $min: "$price" },
        },
      },

      {
        $project: {
          _id: 0,
          avgPrice: 1,
          totalProducts: 1,
          totalRevenue: 1,
          maxProductPrice: 1,
          minProductPrice: 1,
        },
      },
    ]);

    res.status(200).json(analytics);
  } catch (error) {
    console.log("Error getting analytics: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createAuthor = async (req, res) => {
  try {
    const newAuthor = await author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const newBook = await books.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAuthorwithbook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const booky = await books.findById(bookId);
    if (!booky) {
      return res.status(404).json({ error: "Book not found" });
    }
    const booka = await books.find().populate("author", "-_id");
    res.status(200).json(booka);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  insertProduct,
  getProducts,
  getAnalytics,
  createAuthor,
  createBook,
  getAuthorwithbook,
};
