const AuthorModel = require('../models/authorModel')
const jwt = require('jsonwebtoken')
const isvalidEmail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const isValidPassword = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/)
const isValidString=new RegExp(/^[A-Za-z]{3,10}$/)






const createAuthor = async function (req, res) {
  try {
    let data = req.body 
    if (Object.keys(data).length === 0) {
      return res.status(400).send({ status: false, message: "Please enter details" })
    }
    let { fname ,lname, title ,email, password } = data
    if(!fname){
      return res.status(400).send({status: false, message: "fname must be present and have Non empty alphabetical string"})
    }
    if (!isValidString.test(fname)) {
      return res.status(400).send({ status: false, message: " fname should be Alphabetical string with greaterthan 3 letters and less than 10 letters " })
    }
    if(!lname){
      return res.status(400).send({status: false, message: "lname must be present and have Non empty alphabetical string"})
    }
    if (!isValidString.test(lname)) {
      return res.status(400).send({ status: false, message: " lname should be Alphabetical string with greaterthan 3 letters and less than 10 letters  " })
    }
    if (!isvalidEmail.test(email)) {
      return res.status(400).send({ message: "please enter non empty valid email", status: false })
    }
    if ((title !== "Mr") && (title !== "Mrs") && (title !== "Miss")) {
      return res.status(400).send({ status: false, message: "title should be present and have value  Mr or Mrs or Miss only" })
    }
    const duplicateEmail = await AuthorModel.findOne({ email: email })
    if (duplicateEmail) {
      return res.status(400).send({ status: "false", message: "email Id already register ,use another email" })
    }
    if (!isValidPassword.test(password)) {
      return res.status(400).send({ message: "Password is not correct, At least a symbol, upper and lower case letters and a number with min 8 and max 16 letters", status: false })
    }
    const savedata = await AuthorModel.create(data)
    return res.status(201).send({ message: "Author created", status: true, data: savedata })
  }
  catch (err) {
    return res.status(500).send({ message: "Error", status: false, error: err.message })
  }
}


const loginUser = async function (req, res) {
    try {
      let userName = req.body.email;
      let password = req.body.password;
      if ((!userName)) res.status(400).send({ message: "Please provide username" })
      if((!password)) res.status(400).send({status: false, message : "Please provide password"})
    if (!isvalidEmail.test(userName)){
      return res.status(400).send({status : false, message: "email is not correct"})
    }
    if (!isValidPassword.test(password)) {
      return res.status(400).send({ status: false, message: "password is not correct, it contain at least a symbol, upper and lower case letters and a number with min 6 and max 16 letters" })
    }
    let author = await AuthorModel.findOne({ email: userName, password: password });
    if (!author) {
      return res.status(400).send({ message: "Invalid username or password" })
    }
    let payload = {
      authorId: author._id.toString(),
      batch: "plutonium",
      organisation: "FUnctionUp",
    }
    let token = jwt.sign(payload, "projectgroup20-key");
    res.setHeader("x-api-key", token);
    return res.status(201).send({status: true, msg: "login successfully", data: token });
  }
  catch (err) {
    return res.status(500).send({status: false, msg: "Error", error: err.message })
  }
};

module.exports.createAuthor = createAuthor
module.exports.loginUser = loginUser