const Men_productcategory = require("../../models/men.slider.scheme")

exports.create = async (request, response) => {
  const data = new Men_productcategory({
    name: request.body.name,
    description: request.body.description,
    originalPrice: request.body.originalPrice,
    salePrice: request.body.salePrice,
    isOnSale: request.body.isOnSale,
    sizesAvailable: request.body.sizesAvailable,
    color: request.body.color,
    category: request.body.category,
    stockStatus: request.body.stockStatus,
    images: request.body.images,
    isNewArrival: request.body.isNewArrival,
    discountPercentage: request.body.discountPercentage,
    updated_at: Date.now(),
    deleted_at: "",
  })
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
      var error_messages = []
      for (let field in error.errors) {
        error_messages.push(error.errors[field].message)
      }
      var result = {
        status: false,
        message: "Something went wrong !!",
        error_message: error_messages,
      }
      response.send(result)

      console.log(result)
    })
}
exports.view = async (request, response) => {
  try {
    var MensCategoryData = await Men_productcategory.find()
    if (MensCategoryData.length != 0) {
      let resp = {
        status: true,
        message: "record found successfully !!",
        date: MensCategoryData,
      }
      response.send(resp)
    } else {
      let resp = {
        status: false,
        message: "not record  found !!",
      }
      response.send(resp)
    }
  } catch (error) {
    let resp = {
      status: false,
      message: "not record  found !!",
    }
    response.send(resp)
  }
}

exports.delete = async (request, response) => {
  // await Men_productcategory.deleteOne({ _id: request.params.id })
  await Men_productcategory.deleteOne(request.query.id)

    .then(() => {
      let resp = {
        status: true,
        message: "record delete successfully !!",
      }
      response.send(resp)
    })
    .catch(() => {
      let resp = {
        status: false,
        message: "something went wrong !!",
      }
      response.send(resp)
    })
}
exports.update = async (request, response) => {
  let men_slider_update = await Men_productcategory.updateMany(
    {
      deleted_at: null,
    },
    { $set: { deleted_at: Date.now() } }
    // { status: 1,},
    // { $set: { status: 0,deleted_at: Date.now() } }
  )

  try {
    let resp = {
      status: true,
      message: "record update successfully!!",
      data: men_slider_update,
    }
    response.send(resp)
    console.log(resp)
  } catch (error) {
    let resp = {
      status: false,
      message: "record not update !!",
    }
    response.send(resp)
  }
}
