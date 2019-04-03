const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const regEx = "^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$ ";
const levelRecipe = ["Easy Peasy", "Amateur Chef ", "UltraPro Chef" ];
const dishOptions =["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"];

const recipeSchema= new mongose.Schema({
    title: {
        type: String,
        required:true,
        unique: true,
    },
    level:{
        type: String,
        enum: levelRecipe,
    },
    ingredients:{
        type:[String],
    },
    cuisine:{
        type:[String],
        required:true,
    },
    dishType:{
        type: String,
        enum: dishOptions,
    },
    image: { 
        type: String, 
        default:'https://images.media-allrecipes.com/images/75131.jpg.', 
        match: regEx,
    },
    duration:{
        type: Number,
        min: 0,
    },
    
    creator: {
        type:String,
    },
    created: {
        type:Date,
        default: today,
    }
})


module.export= Recipe