
const mid1= function ( req, res, next) {
    req.falana= "hi there. i am adding something new to the req object"
    console.log("Hi I am a middleware named Mid1")
    next()
}

const mid2= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid2")
    next()
}

const mid3= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid3")
    next()
}

const mid4= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid4")
    next()
}




const mid5 = function (req, res , next)
{
    //console.log(req.header.isFreeAppUser)
    //if(!(req.header.isFreeAppUser))  res.send({msg:"isFreeAppUser is absent"})
    let header = req.headers
    let data = header["isfreeappuser"]
    console.log(data)
    if(!data){
        res.send({msg : "missing a mandatory header"})
    }else{
        next()
    }

}




module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3
module.exports.mid4= mid4
module.exports.mid5= mid5
