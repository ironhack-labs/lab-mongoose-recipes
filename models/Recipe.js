const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Modelo con validación de datos
const RecipeSchema = new Schema({
    title: { type: String, required: true, unique: true },
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
    ingredients: { type: Array },
    cuisine: { type: String, required: true },
    dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: { type: Number, min: 0 },
    creator: { type: String },
    created: { type: Date, default: Date.now }
});

// Crear modelo pasando a .model() el nombre del modelo y el esquema
const Recipe = mongoose.model('Recipe', RecipeSchema);


// Exportar el modelo para requerirlo en otros módulos
module.exports = Recipe;