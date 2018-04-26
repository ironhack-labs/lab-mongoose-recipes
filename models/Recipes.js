const mongoose = require('mongoose');

module.exports=mongoose.model("Recipes", {
    title:String,
    level:String,
    ingredients:Array,
    cousine:String,
    dishType:String,
    image:String,
    duration:Number,
    creator:String,
    created:Date
})