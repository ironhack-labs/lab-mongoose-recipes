// MODELOS


// 1. IMPORTACIONES
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



// 2. SCHEMA ()
const recipeSchema = new Schema({
   // Propiedad: Tipo de dato
    title: {type: String},
    level: {type: String},
    ingridients: [ String ],
    cuisine: {type: String},
    dishType: {type: String},
    image: {type: String}, 
    duration: {type: String},
    creator: {type: String}
});




// 3. CREACION DE MODELO

// mongoose.model([colección], [referencia del Schema]  )	
const Recipe = mongoose.model('Recipe', recipeSchema);




// 4. EXPORTACION
module.exports = Recipe;





