const mongoose = require("mongoose");

const newUser = mongoose.Schema({
    name:String,
    email:String,
    number:String,
    password:String,
    status:{type:String,default:"active"},
    role:{type:String,default:"user"},
    image:String
})
const user = mongoose.model("user", newUser);

module.exports =  user;