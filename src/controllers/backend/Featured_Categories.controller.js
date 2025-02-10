const productcategory = require("../../models/Featured_Categories.scheme")

exports.create = async (request, response) => {
  console.log(request.body)
  console.log(request.file)
  const data = new productcategory({
    cloth_heading: request.body.cloth_heading,
    cloth_sub_heading: request.body.cloth_sub_heading,
    status: request.body.status,
    price: request.body.price,
    description: request.body.description,
    imageUrl: request.file ? request.file.filename : "", // Store filename if exists
    updated_at: Date.now(),
    deleted_at: "",
  })
  // if (request.file != undefined) {
  //   if (request.file.filename != "") {
  //     data.imageUrl = request.file.filename
  //   }
  // }

  var output = await data
    .save()
    .then((success) => {
      var result = {
        status: true,
        message: "record found successfully",
        data: success,
      }
      response.send(result)
      console.log(request.body)

      console.log(result)
    })
    .catch((error) => {
      var result = {
        status: false,
        message: "Something went wrong !!",
        error_message: error,
      }
      response.send(result)

      console.log(result)
    })
}

exports.view = async (request, response) => {
  var condition = {
    deleted_at: null,
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
  if (request.body.status != undefined) {
    if (request.body.status != "") {
      condition.status = request.body.status
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

exports.delete = async (request, response) => {
  const productData = await productcategory.findOne({
    _id: request.body.id,
    deleted_at: null,
  })

  if (productData == null) {
    let resp = {
      status: false,
      message: "record not found successfull",
    }
  }

  await productcategory
    .updateOne(
      {
        _id: request.body.id,
      },
      {
        $set: {
          deleted_at: Date.now(),
        },
      }
    )
    .then((result) => {
      let resp = {
        status: true,
        message: "record deleted successfully!!",
      }
      response.send(resp)
    })
    .catch((error) => {
      let resp = {
        status: false,
        message: "something went wrong",
      }
      response.send(resp)
    })
}
exports.multiple_delete = async (request, response) => {
  console.log(request.body)

  let ids = request.body

  await productcategory
    .updateMany(
      {
        _id: { $in: request.body.ids },
      },
      {
        $set: {
          deleted_at: Date.now(),
        },
      }
    )
    .then((result) => {
      let resp = {
        status: true,
        message: "record deleted successfully!!",
      }
      response.send(resp)
    })
    .catch((error) => {
      let resp = {
        status: false,
        message: "something went wrong",
      }
      response.send(resp)
    })
}

exports.update = async (request, response) => {
  data = {
    cloth_heading: request.body.cloth_heading,
    cloth_sub_heading: request.body.cloth_sub_heading,
    // imageUrl: request.body.imageUrl,
    price: request.body.price,
    description: request.body.description,
    status: request.body.status ?? 1,
  }
  if (request.file != undefined) {
    if (request.file.filename != "") {
      data.imageUrl = request.file.filename
    }
  }
  await productcategory
    .updateOne(
      {
        _id: request.body.id,
      },
      {
        $set: data,
      }
    )
    .then((result) => {
      var res = {
        status: true,
        message: "Record update succussfully",
        data: result,
      }

      response.send(res)
    })
    .catch((error) => {
      var error_messages = []

      // for (let field in error.errors) {
      //   // console.log(field);
      //   error_messages.push(error.errors[field].message)
      // }

      var res = {
        status: false,
        message: "Something went wrong",
        error_messages: error_messages,
      }

      response.send(res)
    })
}

exports.details = async (request, response) => {
  var condition = {
    deleted_at: null,
  }

  await productcategory
    .findById(request.params.id)

    .then((result) => {
      if (result != "") {
        let resp = {
          status: true,
          message: "record found successfull",
          data: result,
        }
        response.send(resp)
      } else {
        let resp = {
          status: false,
          message: "no record  found",
          data: "",
        }
        response.send(resp)
      }
    })
    .catch((error) => {
      var resp = {
        status: false,
        message: "something went wrong !!",
      }
      response.send(resp)
    })
}
exports.changestatus = async (request, response) => {
  let product_update = await productcategory.findOne({
    _id: request.body.id,
  })

  if (product_update == null) {
    var res = {
      status: false,
      message: "id not match in database",
    }
    response.send(res)
  }

  await productcategory
    .updateOne(
      {
        _id: request.body.id,
      },
      {
        $set: {
          status: request.body.status,
        },
      }
    )

    .then((result) => {
      let resp = {
        status: true,
        message: "record update successfully!!",
        data: result,
      }
      response.send(resp)
      console.log(resp)
    })
    .catch((error) => {
      let resp = {
        status: false,
        message: "something went wrong !!",
      }
      response.send(resp)
    })
}
