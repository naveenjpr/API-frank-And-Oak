const mongoose = require("mongoose")

const sliderSchema = new mongoose.Schema({
  name: { type: String, required: [true, "women clothe type"] },
  status: {
    type: Boolean,
    default: true,
  },
  description: { type: String },
  originalPrice: { type: Number, required: [true, "add originalPrice"] },
  salePrice: { type: Number },
  isOnSale: { type: Boolean, default: false },
  sizesAvailable: [{ type: String, enum: ["XS", "S", "M", "L", "XL"] }],
  color: { type: String, required: [true, "clothes color add"] },
  category: { type: String, default: "Women" },
  stockStatus: {
    type: String,
    enum: ["In Stock", "Out of Stock"],
    default: "In Stock",
  },
  images: [{ type: String }], // URLs for images
  isNewArrival: { type: Boolean, default: false },
  discountPercentage: { type: Number },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: "",
  },
})

const sliderModel = mongoose.model("women_slider", sliderSchema)

module.exports = sliderModel
