//Schemas
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    level:{
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: Array,
    cuisine:{
        type:String,
        required: true
    },
    dishType: {
        type: String,
        enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
        image: {
            type: String,
            default: "https://images.media-allrecipes.com/images/75131.jpg"
        }
    },
        duration: {
            type: Number,
            min: 0,
        },
        creator: String,
        created:{
            type: Date,
            default: Date.now(),
        },
}, {timestamps:true});


module.exports = mongoose.model('Recipe', recipeSchema);








