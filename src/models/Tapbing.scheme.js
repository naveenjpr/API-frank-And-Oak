const mongoose = require("mongoose");

const TaabingSchema = new mongoose.Schema({
  category: { type: String, required: true, enum: ["men", "women"] },
  heading: { type: String, required: true },
  frontImage: { type: String, required: true },  // URL or local path
  backImage: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: [String], required: true }, // Array of sizes
});

module.exports = mongoose.model("Tabing_men_women", TaabingSchema);
