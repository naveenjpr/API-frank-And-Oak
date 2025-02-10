const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const server = express()
server.use(cors())

server.use(express.json())
server.use(express.urlencoded({ extended: true }))


// Serve uploaded images statically

server.use("/uploads/courses", express.static("uploads/courses"))

// Routes
server.get("/", (request, response) => {
  response.send("Server Working Fine.....")
})
//Backend Urls

require("./src/routes/backend/Featured_Categories.routes")(server)
require("./src/routes/backend/women.slider.routes")(server)
require("./src/routes/backend/men.slider.routes")(server)
server.get("*", (request, response) => {
  response.send("Page not found.....")
})
//Fronted Urls
require("./src/routes/fronted/Featured_Categories.routes")(server)
// require("./src/routes/fronted/user.routes")(server)

mongoose // Mongoose connection
  .connect("mongodb://127.0.0.1:27017/Frank_And_Oak_USA")
  .then(() => {
    server.listen("5000", () => {
      console.log("Database Connected!")
    })
  })
  .catch((error) => {
    console.log("Database Not Connected!" + error)
  })
