const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema(
  {
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: [ 'Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: {type: Array},
    cousine: {type: String, required: true},
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    creator: {type: String},
    created: {type: Date, default: Date.now()}
  }
)

const Recipe = mongoose.model('Recipe', recipeSchema);

const newRecipe = new Recipe(
  {
    title: 'Ayumi rice noodles',
    level: 'Easy Peasy',
    ingredients: ['noodles', 'vegetables', 'curry'],
    cousine: 'Asian',
    duration: 5,
    creator: 'Ayumi',
  }
)

Recipe.create(newRecipe, (error, recipe) => {
  if (error) console.log(error);
  else console.log('Your new recipe was saved correctly on the database');
});

Recipe.insertMany(data, (error, recipes) => {
  if (error) console.log(error);
  else console.log('Your new recipes were saved correctly on the database');
} )

setTimeout( () => {
  Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(recipe => console.log('recipe updated') )
  .catch(error => console.log(error) )
}, 4000 )

setTimeout( () => {
  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(recipe => console.log('recipe removed') )
  .catch(error => console.log(error) )
}, 4000 )

setTimeout(() => { mongoose.disconnect() }, 10000 );