const express = require("express")
const route = express.Router()
const TapbingController = require("../../controllers/backend/Tapbingcontroller")

// Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/")
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname)
//   },
// })

// const upload = multer({ storage })

module.exports = (app) => {
  route.post("/add", TapbingController.create)

  route.post("/view", TapbingController.view)

  route.delete("/delete/:id", TapbingController.delete)
  route.put("/change-status", TapbingController.changeStatus)
  route.post("/update", TapbingController.update)

  route.post("/details/:id", TapbingController.details)

  // route.post('/multiple-delete',upload.none(), coursesController.multipleDelete)

  app.use("/api/backend/Tapbing_Categories", route)
}
