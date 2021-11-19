//1. IMPORTACIONES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//2. Schema
const recipeSchema = new Schema({
    title: String,
    level: String,
    ingredients: [String],
    cuisine: String,
    dishType: String,
    image: String,
    duration: Number,
    creator: String,
    created: Date
});


// 3. MODELO -------------------------------------------------------- OJO
// mongoose.model([colección], [referencia del Schema]  )	
const Recipe = mongoose.model('Recipe', recipeSchema);
// 4. EXPORTACIÓN
module.exports = Recipe;
