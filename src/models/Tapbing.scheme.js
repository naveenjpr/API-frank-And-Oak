const mongoose = require("mongoose")

const TaabingSchema = new mongoose.Schema({
  category: { type: String, enum: ["men", "women"] },

  color: { type: String },
  size: { type: [String] },

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
    type: Number,
    required: [true, "clothe price required in number"],
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
