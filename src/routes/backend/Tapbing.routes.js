const express = require("express");
const multer = require("multer");
const { getProducts, addProduct } = require("../../controllers/backend/Tapbingcontroller");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.get("/", getProducts);
router.post("/add", upload.fields([{ name: "frontImage" }, { name: "backImage" }]), addProduct);

module.exports = router;
