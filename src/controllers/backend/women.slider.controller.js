const { request } = require("express")
const Womencategoryslider = require("../../models/women.slider.scheme")

exports.create = async (request, response) => {
  const data = new Womencategoryslider({
    name: request.body.name,
    status: request.body.status,
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
  // const condition = {
  //   deleted_at: null,
  // }

  // if (request.body.status != "") {
  //   condition.status = request.body.status
  // }
  // if (request.body.name != "") {
  // condition.name = request.body.name
  // condition.name = new RegExp("^" + request.body.name) // starting me search karna hai
  // condition.name = new RegExp(request.body.name,"i")   // starting,middle,end all side me search karna hai
  // }

  const condition = [
    {
      deleted_at: null,
    },
  ]
  if (request.body.status != "") {
    condition.push({
      status: request.body.status,
    })
  }
  if (condition.length > 0) {
    var filter = {
      $or: condition,
    }
  }
    else{
      var filter={}
    }
  

  try {
    var WomencategoryData = await Womencategoryslider.find(filter)
    // var WomencategoryData = await Womencategoryslider.find({
    //   $or: [
    //     {
    //       deleted_at: null,
    //     },
    //     {
    //       status: 1,
    //     },
    //   ],
    // })

    if (WomencategoryData.length != 0) {
      let resp = {
        status: true,
        message: "record found successfully !!",
        data: WomencategoryData,
      }
      response.send(resp)
    } else {
      let resp = {
        status: true,
        message: "record not found !!",
      }
      response.send(resp)
    }
  } catch (error) {
    let resp = {
      status: true,
      message: "record not found !!",
    }
    response.send(resp)
  }
}

exports.delete = async (request, response) => {
  // await Womencategoryslider.deleteOne({_id:request.body.id})
  // await Womencategoryslider.findByIdAndDelete({ _id: request.body.id })
  await Womencategoryslider.findByIdAndDelete(request.params.id)
    // await Womencategoryslider.deleteOne({_id:request.body.id})
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
  // let women_slider_update = await Womencategoryslider.updateOne(
  //   { _id: request.body.id },
  //   {
  //     $set: {
  //       deleted_at: Date.now(),
  //     },
  //   }
  // )
  let women_slider_update = await Womencategoryslider.updateMany(
    { _id: request.body.id },
    {
      $set: {
        deleted_at: Date.now(),
      },
    }
  )
  try {
    let resp = {
      status: true,
      message: "record update successfully!!",
      data: women_slider_update,
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
