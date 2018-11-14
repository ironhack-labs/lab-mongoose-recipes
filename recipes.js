const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


const recipeSchema = {
  title: {type: String, required: true, unique: true},
  level: {type: String, required: ['Easy Peasy', 'Amatuer Chef', 'UltraPro Chef']},
  ingredients: [String],
  cuisine: {type: String, required: true},
  dishType: {type: String, required: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: URL('https://images.media-allrecipes.com/images/75131.jpg')},
  duration: {type: Number, minLength: 0},
  creator: {type: String},
  created: {type: Date, default: getDate()},

}

recipe.create({
  title: "Grubbs Loves",
  level: "Easy Peasy",
  ingredients: ["butter", "cookie dough", "love"],
  cuisine: 'American',
  dishType: "dessert",
  image: '',
  duration: 20,
  creator: 'Travis',
  created: getDate();
})
.then(()=>{
  console.log(data.title)
}).catch(err =>{
  console.log("HEY!! ERROR: ")
})





mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
