const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeTheBlog,
  disLikeTheBlog,
} = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadImages } = require("../controller/uploadCtrl");
const { uploadPhoto, blogsImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  blogsImgResize,
  uploadImages
);

router.put("/likes", authMiddleware, likeTheBlog);
router.put("/dislikes", authMiddleware, disLikeTheBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);
router.get("/", getAllBlogs);
module.exports = router;
