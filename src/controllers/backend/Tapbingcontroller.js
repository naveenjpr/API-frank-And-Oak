const Tabing_men_womenes = require("../../models/Tapbing.scheme");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Tabing_men_womenes.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new product
exports.addProduct = async (req, res) => {
  try {
    const { category, heading, price, color, size } = req.body;
    const frontImage = req.files["frontImage"][0].path;
    const backImage = req.files["backImage"][0].path;

    const newProduct = new Product({
      category,
      heading,
      frontImage,
      backImage,
      price,
      color,
      size,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
