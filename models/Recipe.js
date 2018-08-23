const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: String,
    level: String,
    ingredients: [String],
    cousine: String,
    dish_type: String,
    image: {
        type: String,
        default: ' https://images.media-allrecipes.com/images/75131.jpg'
    },
    duration: {
        type: Number,
        min: 0
    },
    creator: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Recipe', recipeSchema)
