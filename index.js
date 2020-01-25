const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
 })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  // Iteration 2 create a recipe
  Recipe.create({
    title: 'Oreo Sundae',
    level: 'Amateur Chef',
    ingredients: ['ice cream', 'oreo', 'hot fudge', 'whip cream'],
    cuisine: 'Cream',
    dishType: 'Dessert',
    duration: 6,
    creator: 'Kevin'
  })
  .then(recipe => console.log(`${recipe.title} was successfully added: 
  ${recipe}`))
  .catch(err => console.log(err));

  // Iteration 3 Insert many recipes 
  Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => console.log(recipe.title))
  })
  .catch(err => console.log(`An error occured: ${err}`));

  // Iteration 4 Update recipe
  Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => console.log(`The duration was successfully updated!`))
  .catch(err => console.log(`An error occured: ${err}`));

  // Iteration 5 Remove a recipe
  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(recipe => console.log(recipe, 'deleted'))
  .catch(err => console.log(err));

  // Iteration 6 Close the database
  mongoose.connection.close(() => {
    console.log('Connection closed!');
  });

