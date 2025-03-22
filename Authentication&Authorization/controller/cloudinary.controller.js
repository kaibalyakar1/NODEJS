const uploadToCloudinary = require("../cloudinary/helper");
const Image = require("../model/image.model");
const fs = require("fs");
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Upload image to cloudinary
    const image = await uploadToCloudinary(req.file.path);
    const uploadedImage = new Image({
      url: image.url,
      publicId: image.publicId,
      uploadedBy: req.user.id,
    });
    await uploadedImage.save();
    fs.unlinkSync(req.file.path);
    res
      .status(201)
      .json({ message: "Image uploaded successfully", uploadedImage });
  } catch (error) {
    console.log("Error uploading image: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fetchImages = async (req, res) => {
  try {
    const images = await Image.find();
    if (!images) {
      return res.status(404).json({ error: "No images found" });
    }
    res.status(200).json(images);
  } catch (error) {
    console.log("Error fetching images: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { uploadImage, fetchImages };
