const mongoose = require("mongoose")

const CategoryScheme = new mongoose.Schema({
  cloth_heading: {
    type: String,
  },
  cloth_sub_heading: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true, 
  },

  price: {
    type: Number,
    required: [true, "clothe price required in number"],
  },

  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
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

const ProductModel = mongoose.model("Featured_Categories", CategoryScheme)

module.exports = ProductModel
