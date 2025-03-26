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
        $match: {
          inStock: "true",
          price: { $gt: price },
        },
      },
    ]);
    res.status(200).json(products);
  } catch (error) {
    console.log("Error getting products: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { insertProduct, getProducts };
