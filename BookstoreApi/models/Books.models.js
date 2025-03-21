const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      maxLenght: 100,
    },
    author: {
      type: String,
      maxLenght: 100,
    },

    price: {
      type: Number,
    },
    year: {
      type: Number,
      min: [4, "Year must be 4 digits"],
      max: [
        new Date().getFullYear(),
        "Year cannot be greater than current year",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);
