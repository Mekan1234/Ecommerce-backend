const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const fs = require("fs");
const { app } = require("../utils/cloudinary");

const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");

// const uniqid = require("uniqid");

const uploadImages = asyncHandler(async (req, res) => {
  const storageFB = getStorage(app, "gs://ecommerceproject-86b5b.appspot.com");
  try {
    const images = [];
    const files = req.files;
    for (const file of files) {
      // console.log(file);
      const { path } = file;
      // console.log(file);
      // const newpath = await uploader(path);
      // urls.push(newpath);
      // fs.unlinkSync(path);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileName = file.fieldname + "-" + uniqueSuffix + ".jpeg";
      const storageRef = ref(storageFB, `${file.fieldname}/${fileName}`);
      const metadata = {
        contentType: file.mimetype,
      };
      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );
      const downloadURL = await getDownloadURL(snapshot.ref);
      images.push({
        URL: downloadURL,
        name: fileName,
      });
      // await uploadBytesResumable(storageRef, file.buffer, metadata);
    }

    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const storage = getStorage();
  try {
    const desertRef = ref(storage, `images/${name}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        console.log("File deleted successfully");
        // File deleted successfully
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
