const mongoose = require('mongoose');
const userschema = new mongoose.Schema(
    {
        name: String,
        balance:{type: Number , 
        default : 100}, 
        address:String,
        age: Number,
         gender: {
            type : String,
            enum : ["male", "female" , "other"]
         }, 
        isfreeappuser: Boolean
    }
)
module.exports = mongoose.model('User', userschema)
