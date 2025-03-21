require("dotenv").config();
const express = require("express");
const { connectDb } = require("./db");

const app = express();

const start = async () => {
  try {
    await connectDb();
    app.listen(8080, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log("Error connecting to the database: ", error);
    process.exit(1);
  }
};

start();
