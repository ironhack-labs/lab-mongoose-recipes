//4) importar Mongoose
const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

//5) Fazer o modelo 
const recipeSchema = new mongoose.Schema({
  title: {type: String, require},
  level: {type: String, enum:['Easy', 'Peasy', 'Amateur Chef','UltraPro Chef']},
  ingredients: [String],//é uma array que recebe strings 
  cuisine: {type: String, require},
  dishType: {type: String, enum:['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: {type: String}
}, {
  timestamps: true,
});

//6)declarando que a coleçao Recipe vai seguir o recipeSchema
const Recipe = mongoose.model('Recipe', recipeSchema);

//7) exportar o modelo
module.exports = Recipe;
