const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Desconocido',
    trim: true,
},
  level: {
    type: String,
    enum:[`Easy Peasy`, `Amateur Chef` , `UltraPro Chef`]
},
 ingredients: {
    type: [String]
},
  cuisine: {
      type: String,
      required: true         // Array de strings
  },
  dishtype: {
      type: String,
      enum:['breakfast', 'main_course', 'soup,' ,'snack', 'drink', 'dessert' , 'other']
  },
  image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min:0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date
  },
},
{
timestamps: true

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
