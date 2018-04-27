const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
// define schema then create model 
//i
const recipeSchema = new Schema({
  title : { type: String},
  level : {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients  : Array,
  cousine: String,
  dishType: { type: String,enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: String,
  duration: Number,
  creator: String,
  created: {type: Date, default: Date.now()}

});

  const Recipe = mongoose.model('Recipe', recipeSchema);

  // create new recipe:
  // when rerunning, comment out to not recreate 
// Recipe.create({
//   tite: "EggPlantPizza",
//   level: 'Amateur Chef',
//   ingredients: ['eggsplants', 'mixed cheese'],
//   cousine: 'italian',
//   dishType: 'Dish',
//   image: 'https://c7.alamy.com/comp/AR5TB9/courgette-and-aubergine-pizza-zucchini-and-eggplant-pizza-AR5TB9.jpg',
//   duration: 40,
//   creator: 'Crystal and Brian'
// })
// .then((recipe) => {
//   console.log('new dish created',recipe )
// })
// .catch((error) => {
//   console.log("Error is: ", error)
// })

// iteration 3
Recipe.insertMany(data)
.then((recipes) => {
  data.forEach(oneData => {
  console.log('recipes edit', oneData.title );
  })
})
.catch((error) => {
  console.log("Error is: ", error); // .catch(argu) must match console.log(' ', here)
})
// update recipe
