const mongoose = require("mongoose");

const newNews = new mongoose.Schema({
    category:String,
    Title:String,
    short_description:String,
    description:String,
    date:Date,
    author_name:String,
    image:String,
    comments:[{
        PersonName:String,
        comment:String
    }],
    Likes:{type:Number,default:0},
    dislike:{type:Number,default:0},
    status:{type:String,default:"Published"},
})

const news = mongoose.model("news",newNews);

module.exports  = news;