const express = require("express")
const route = express.Router()
const courseController = require("../../controllers/fronted/Featured_Categories.controller")

module.exports = (app) => {
  route.post("/view", courseController.view)

  app.use("/api/frontend/Featured_Categories", route)
}
