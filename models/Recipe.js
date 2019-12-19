const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title : {type: String, required: true, unique: true},
  level : {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']}, 
  ingredients: {type: Array},
  cuisine : {type: String, required: true},
  dishType : {type: String, enum : ['Breakfast', 'Dish', 'Snack', 'Drink',  'Dessert', 'Other']},
  image : {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration : { type: Number, min: 0},
  creator : { type: String},
  created: {type: Date, default: Date.now},
});

// recipe.create({title: 'Bolinho de bacalhau', level: 'Amateur Chef',ingredients: ['Bacalhau','Farinha','Ovo'],cuisine:'Portuguesa',dishType:'Snack', image: 'https://images.media-allrecipes.com/images/75131.jpg'
// duration: 30, creator: 'Vini e Fabio'}, function (err,recipe){
//     if(err) {
//       console.log('Erro')
//     } else {
//       console.log(`O nome da receita é ${title}`)
//     }
// });


const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
