const express = require("express");
const router = express.Router();
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  // productImgResize,
  uploadImages
);

router.delete("/delete-img/:name", authMiddleware, isAdmin, deleteImages);

module.exports = router;
