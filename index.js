const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

Recipe.create({ 
  title: 'Carrot cake',
  cuisine: 'Meh',
  dishType: 'Breakfast'
})
.then (recipe =>  console.log(recipe.title))
.catch (error => console.log(error));

var arr = [
  { 
    title: 'Pizza',
    cuisine: 'Italian',
    dishType: 'Snack'
  },
  { 
    title: 'Bitterballen',
    cuisine: 'Dutch',
    dishType: 'Other'
  },
]

Recipe.insertMany(arr, function(error, docs) {});

let italianMeal = Recipe.find({title: 'Rigatoni alla Genovese'})
italianMeal.updateOne(
  {
    duration: '100',
  }
)
.then (recipe =>  console.log('now it is good', recipe))
.catch (error => console.log(error))

Recipe.deleteOne({ title: 'Ratatouille' })
.then (recipe =>  console.log(recipe.title))
.catch (error => console.log(error));