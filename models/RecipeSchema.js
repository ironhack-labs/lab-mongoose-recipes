// Importamos mongoose para poderlo usar
const mongoose = require('mongoose');
//Llamamos un metodo schema para crear el schema
const Schema = mongoose.Schema;

//Instanciamos el schema o modelo...
const recipeSchema = new Schema({
  title: {
    type: String,
    required: unique
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: Array,
  },
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snak', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  }
})

//EXPORTA el schema o modelo para usarlo en otra parte; "Perro" asi se llama el archivo
const Recipe = mongoose.model("RecipeSchema", recipeSchema);
module.exports = Recipe