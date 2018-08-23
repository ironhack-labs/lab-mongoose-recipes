const mongoose = require("mongoose")


//creating Schema
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        requiered: true,
        unique: true,
    },
    level: {
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: [],
    cousine: {
        type: String,
        requiered: true,
    },

    dishType: {
        type: String,
        enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
    },

    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg",
    },

    duration: {
        type: Number,
        min: 0,
    },

    creator: String,

    created: {
        type: Date,
        default: new Date()
    },

})

module.exports = mongoose.model("Recipe", recipeSchema)