const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: {type: Array},
  cousine: {type: String, required: true},
  disType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now}
})

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({title: 'Billy Cookies', level: 'UltraPro Chef', cousine: 'Cambodian'})
  .then(() => {
    console.log("Creation success!");
  })
  .catch((err) => {
    console.log("CREATION FAILED!", err);
  })

var arr = data;

Recipe.insertMany(arr)
  .then((arr) => {
    arr.forEach((oneRecipe) => {
      console.log(oneRecipe.title);
    });
  })
  .catch((err) => {
    console.log("ERROR", err);
  })

Recipe.findByIdAndUpdate("5acf56dd764b353b9b2f6997", {duration:100})
  .then(() => {
    console.log("Update success!");
  })
  .catch((err) => {
    console.log("Update failed :/", err);
  })

Recipe.findByIdAndRemove("5acf56dd764b353b9b2f6996")
  .then(() => {
    console.log("Deletion success!");
  })
  .catch((err) => {
    console.log("Deletion failed :/", err);
  })

