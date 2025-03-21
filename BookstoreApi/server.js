const express = require("express");
const { connectDb } = require("./Db/db.js");
const book = require("./routes/books.router");
const app = express();
app.use(express.json());

app.use("/api/books", book);
const port = 3000;
connectDb();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
