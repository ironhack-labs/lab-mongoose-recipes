const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: {
        type: [String]
    },
    cuisine: {
        type: String,
        required: true
    },
    dishType: {
        type: String,
        enum: ["breakfast", "main_course", "soup", "snack", "drink", "dessert", "other"]
    },
    image: {
        type: String,
        default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
        type: Number,
        default: 0
    },
    creator: String,
    created: {
        type: Date,
        default: Date.now
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);
// observacion para mi: el 'Recipe' = el nombre de la colección yo se lo doy en este momento, 
//bajo este nombre es que lo busco en el mongoshell
//El segundo parametro es siempre el nombre del esquema

module.exports = Recipe;
//model('Recipe', recipeSchema);