const mongoose = require("mongoose")

const newComplaint = new mongoose.Schema({
    name:String,
    email:String,
    message:String
})

const complaint = mongoose.model("complaint",newComplaint);

module.exports = complaint;