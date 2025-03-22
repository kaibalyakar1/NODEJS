const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  uploadImage,
  fetchImages,
} = require("../controller/cloudinary.controller");
const { upload } = require("../middlewares/upload.middleware");
const router = express.Router();

//upload image
router.post("/upload", authMiddleware, upload.single("image"), uploadImage);
router.get("/images", authMiddleware, fetchImages);
module.exports = router;
