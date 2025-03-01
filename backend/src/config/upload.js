const multer = require("multer");
const cloudinary = require("cloudinary");
const{ CloudinaryStorage} = require ("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET});

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "skills_images",
        allowed_formats: ["jpg","jpeg","png","gif"],
    },
  });

  const upload = multer({storage: storage});

  module.exports = upload;