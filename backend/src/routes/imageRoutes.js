const express = require("express");
const multer = require("multer");
const auth = require("../middlewares/auth");
const router = express.Router();

const {
  createImage,
  getAllImages,
  getImageDetails,
  removeImage,
} = require("../controllers/imageController");

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), auth, createImage);
router.get("/", getAllImages);
router.get("/:id", getImageDetails);
router.delete("/:id", auth, removeImage);

module.exports = router;
