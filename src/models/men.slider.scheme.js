const mongoose = require("mongoose")

const MensliderSchema = new mongoose.Schema({
  name: { type: String, required: [true, "me clothe type"] },
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
  category: { type: String, default: "men" },
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

const MenssliderModel = mongoose.model("men_slider", MensliderSchema)

module.exports = MenssliderModel
