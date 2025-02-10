const express = require("express")
const route = express.Router()
const CategoryController = require("../../controllers/backend/Featured_Categories.controller")
const multer = require("multer")
const upload = multer({ dest: "uploads/courses" })
const path = require("path")

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cba) => {
    cba(null, "uploads/courses") // Ensure this folder exists
  },
  filename: function (req, file, cba) {
    const uniqueSuffix = Date.now()

    var imagePath = path.extname(file.originalname)
    cba(null, file.fieldname + "-" + uniqueSuffix + imagePath)
  },
})
// Initialize multer upload middleware

const uploadImage = multer({ storage: storage }).single("imageUrl")
// Routes

module.exports = (app) => {
  route.post("/add", uploadImage, CategoryController.create)
  route.post("/view", upload.none(), CategoryController.view)
  route.post("/delete", upload.none(), CategoryController.delete)
  route.post(
    "/multiple-delete",
    upload.none(),
    CategoryController.multiple_delete
  )
  route.put("/update", uploadImage, CategoryController.update)
  route.post("/details/:id", upload.none(), CategoryController.details)
  route.put("/change-status", upload.none(), CategoryController.changestatus)

  app.use("/api/backend/Featured_Categories", route)
}
