const Tabing_men_womenes = require("../../models/Tapbing.scheme")

// Get all products
exports.create = async (request, response) => {
  console.log(request.body)

  data = new Tabing_men_womenes({
    category: request.body.category,
    color: request.body.color,
    size: request.body.size,
    frontImage: request.body.frontImage,
    backImage: request.body.backImage,
    heading: request.body.heading,
    price: request.body.price,
    status: request.body.status ?? 1,
  })

  // if(request.file != undefined){
  //     if(request.file.filename != ''){
  //         data.image = request.file.filename;
  //     }
  // }

  await data
    .save()
    .then((result) => {
      var res = {
        status: true,
        message: "Record create succussfully",
        data: result,
      }

      response.send(res)
    })
    .catch((error) => {
      var error_messages = []

      for (let field in error.errors) {
        // console.log(field);
        error_messages.push(error.errors[field].message)
      }

      var res = {
        status: false,
        message: "Something went wrong",
        error_messages: error_messages,
      }

      response.send(res)
    })
}

exports.view = async (request, response) => {
  var condition = {
    deleted_at: null,
  }

  if (request.body.category != undefined) {
    if (request.body.category != "") {
      condition.category = new RegExp(request.body.category, "i")
    }
  }
  if (request.body.size != undefined) {
    if (request.body.size != "") {
      condition.size = new RegExp(request.body.size, "i")
    }
  }
  if (request.body.frontImage != undefined) {
    if (request.body.frontImage != "") {
      condition.frontImage = new RegExp(request.body.frontImage, "i")
    }
  }
  if (request.body.backImage != undefined) {
    if (request.body.backImage != "") {
      condition.backImage = new RegExp(request.body.backImage, "i")
    }
  }
  if (request.body.heading != undefined) {
    if (request.body.heading != "") {
      condition.heading = new RegExp(request.body.heading, "i")
    }
  }
  if (request.body.price != undefined) {
    if (request.body.price != "") {
      condition.price = request.body.price
    }
  }
  if (request.body.status != undefined) {
    if (request.body.status != "") {
      condition.status = request.body.status
    }
  }

  console.log(condition)

  try {
    var Featured_category = await Tabing_men_womenes.find(condition).sort({
      created_at: -1,
    })
    if (Featured_category.length > 0) {
      let resp = {
        status: true,
        message: "record found successfull",
        imagePath: "http://localhost:5000/uploads/courses/",

        data: Featured_category,
      }
      response.send(resp)
    } else {
      let resp = {
        status: true,
        message: "record not found",
      }
      response.send(resp)
    }
  } catch (error) {
    let resp = {
      status: false,
      message: "record not found",
    }
    response.send(resp)
  }
}

// exports.update = async (request, response) => {}

// exports.delete = async (request, response) => {}
