const express = require("express")
const route = express.Router()
const CategoryController = require("../../controllers/backend/men.slider.controller")

module.exports = (app) => {
  route.post("/add", CategoryController.create)
  route.post("/view", CategoryController.view)
  route.delete("/delete", CategoryController.delete)
  route.post("/update", CategoryController.update)

  app.use("/api/backend/Mens_Categories", route)
}
