const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const productRoutes = require("./routes/product.routes");

app.use(express.json());

app.use("/api/product", productRoutes);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL).then(() => {
      console.log("Connected to the database");
    });
  } catch (error) {
    console.log("Error connecting to the database: ", error);
    process.exit(1);
  }
};

const start = async () => {
  try {
    await connectDb();
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log("Error connecting to the database: ", error);
    process.exit(1);
  }
};

start();
