const mongoose = require("mongoose");

module.exports= mongoose.model("Receta",{
    title:String,
    level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
    ingredients: Array,
    cousine: {type:String, required:true},
    dishType: {type: String, enum: ["Breakfast", "Dish", "Snack","Drink", "Desset", "Other"]},
    image: {type: String, default:"https://images.media-allrecipes.com/images/75131.jpg."},
    duration:  {type: Number,min:0},
    creator: String,
    created: {type:Date, default: Date.now}
})