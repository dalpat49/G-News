const mongoose = require("mongoose")

const newSubscribe = new mongoose.Schema({
    email:String,

});

const subscribed = mongoose.model("subscribed", newSubscribe);

module.exports = subscribed;