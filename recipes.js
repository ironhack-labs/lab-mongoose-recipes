const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
    mongoose.connection.close();
  }).catch((err) => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema ({

  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [String],
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}

});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Recipe.create({
//   title: 'Biryani',
//   level: 'UltraPro Chef',
//   ingredients: ['Basmati rice', '2 large onions, finely chopped', '4 tablespoons vegetable oil', '4 small potatoes', '2 cloves garlic, minced'],
//   cuisine: 'South Asian',
//   dishType: 'Dish',
//   image: 'https://www.ndtv.com/cooks/images/mutton-biryani-new.jpg',
//   duration: 40,
//   creator: 'Chad and Ali'
// })
// .then((theRecipe)=>{

//   console.log('It worked!');

// })
// .catch((err)=>{

//   console.log('Did not work');

// })

// Recipe.insertMany(data)
// .then((response)=>{

//   console.log(response);

// })
// .catch((err)=>{

// console.log(err);

// });

// Recipe.findByIdAndUpdate("5b3e5a315774f6833922ccd9",{
//   duration: 100
// })
// .then((response)=>{

//   console.log('It worked');

// })
// .catch((err)=>{

//   console.log(err);

// });

// Recipe.findByIdAndRemove("5b3e5a315774f6833922ccd8")
// .then((response)=>{

// console.log("Carrot Cake deleted");

// })
// .catch((err)=>{

// console.log(err);

// });

