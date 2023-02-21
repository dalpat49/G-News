const mongoose = require("mongoose");

const newAdmin = new mongoose.Schema({
    name:String,
    email:String,
    number:Number,
    Company:String,
    role:String,
    status:{type:String.fromCharCode,default:"Active"},
    password:String
})

const admin = mongoose.model("admin",newAdmin);

module.exports = admin;