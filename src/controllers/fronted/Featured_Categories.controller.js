const productcategory = require("../../models/Featured_Categories.scheme")

// var jwt = require('jsonwebtoken');
// var secretKey = '123456789';

exports.view = async (request, response) => {
  var condition = {
    deleted_at: null,
    status: 1,
  }

  if (request.body.cloth_heading != undefined) {
    if (request.body.cloth_heading != "") {
      condition.cloth_heading = new RegExp(request.body.cloth_heading, "i")
    }
  }
  if (request.body.cloth_sub_heading != undefined) {
    if (request.body.cloth_sub_heading != "") {
      condition.cloth_sub_heading = new RegExp(
        request.body.cloth_sub_heading,
        "i"
      )
    }
  }
  if (request.body.price != undefined) {
    if (request.body.price != "") {
      condition.price = request.body.price
    }
  }

  console.log(condition)

  try {
    var Featured_category = await productcategory
      .find(condition)
      .sort({ created_at: -1 })
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
