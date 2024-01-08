const cloudinary = require("cloudinary");
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFthOwo_M_R7IdgomKmZlZ0xZwVPy7pNQ",
  authDomain: "ecommerceproject-86b5b.firebaseapp.com",
  projectId: "ecommerceproject-86b5b",
  storageBucket: "ecommerceproject-86b5b.appspot.com",
  messagingSenderId: "971559291042",
  appId: "1:971559291042:web:bcdb5c5db4719e3f4aaffb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};
const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg, auth, app };
