const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

/*** Iteration 1 ***/

const recipeSchema = new Schema({

  title: {
    type: String,
    required: true,
    unique: true,
  },

  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },

  ingredients: [String],

  cuisine: {
    type: String,
    required: true
  },

  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
  },

  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },

  duration: {
    type: Number,
    min: 0,
  },

  creator: String,

  created: {
    type: Date,
    default: Date.now
  }

});
const Recipe = mongoose.model("Recipe", recipeSchema);

/*** Iteration 2 ***/

const myFirstRecipe = new Recipe({
  title: 'My delicious first recipe',
  level: 'Easy Peasy',
  ingredients: ['tomato', 'garlic', 'chili', 'onion', 'pinch of love'],
  cuisine: 'italian',
  dishType: 'Dish',
  duration: 20,
  creator: 'El Patron',
});
myFirstRecipe.save();


function log(message) {
  return () => console.log(message)
}


let addAllElements =
  Recipe
    .insertMany(data)
    .then(log('inserted all data'))
    .catch(err => {throw new Error("error while inserting the data array")});


let updateElement =
  Recipe
    .updateOne({title: 'Rigatoni alla Genovese'}, {$set: {duration: 100}})
    .then(log("updated successfully the Rigatoni"))
    .catch(err => {throw new Error("Error while updating")})
;


let deleteElement =
  Recipe
    .deleteOne({title: 'Carrot Cake'})
    .then(log('Deleted Carrot Cake'))
    .catch(err => {throw new Error("Error while deleting")})
;


addAllElements
  .then(() => {return Promise.all([updateElement, deleteElement])})
  .then(() => mongoose.connection.close())
  .then(log('connection closed'))
  .catch(err => console.log(err));
