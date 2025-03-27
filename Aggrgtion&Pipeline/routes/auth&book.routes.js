const express = require("express");
const router = express.Router();

router.post("/create-author");
router.post("/create-book", createBook);

module.exports = router;
