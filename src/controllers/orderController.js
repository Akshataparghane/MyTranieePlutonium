const orderModel = require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel = require("../models/userModel")

const createOrder= async function (req, res) {
    let data = req.body
    let userid = req.body.userId
    let usercheck = await userModel.findById(userid)
    if(!(usercheck)) res.send({msg : "userId is not matched"})
    let productid = req.body.productId
    let productcheck = await productModel.findById(productid)
    if(!(productcheck)) res.send({msg : "productId is not matched"})
    // if(usercheck.isFreeAppUser == true){
    //     data.amount = 0
    //     let savedData= await orderModel.create(data)
    //     res.send({data: savedData})
    // }
    data.amount = productcheck.price
    let savedData1= await orderModel.create(data)
    let updatedbalance = usercheck.balance - productcheck.price
    let updateData = await userModel.findByIdAndUpdate({_id:userid},{$set:{balance:updatedbalance}},{new:true})
    res.send({data: savedData1})
}

module.exports.createOrder= createOrder
