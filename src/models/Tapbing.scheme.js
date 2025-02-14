const mongoose = require("mongoose")

const TaabingSchema = new mongoose.Schema({
  category: { type: String, enum: ["men", "women"] },

  color: {
    type: String,
    enum: [
      "Orange",
      "Purple",
      "Brown",
      "Gray",
      "Pink",
      "Yellow",
      "Green",
      "White",
      "Black",
      "Blue",
      "Red",
    ],
  },

  size: { type: String, enum: ["S", "M", "L", "XL", "XXL"] },

  frontImage: { type: String }, // URL or local path
  backImage: { type: String },
  heading: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },

  price: {
    type: String,
    // required: [true, "clothe price required in number"],
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

module.exports = mongoose.model("Tabing_men_women", TaabingSchema)
