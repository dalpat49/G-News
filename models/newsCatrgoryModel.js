const mongoose = require("mongoose")

const newCategory = new mongoose.Schema({
    category_name:String,
    Status:{type:String,default:"active"}
})

const NewsCategory = mongoose.model("NewsCategory",newCategory)

module.exports = NewsCategory;