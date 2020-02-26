const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'
const myRecipe = {
  title: 'Tortilla de patatas',
  level: 'Amateur Chef',
  ingredients: ['5 potatoes', '8 eggs', 'Olive oil', 'Salt', 'Pepper'],
  cuisine: 'Spanish',
  dishType: 'Dish',
  image: 'https://vod-hogarmania.atresmedia.com/hogarmania/images/images01/2013/06/12/5bf42bdda649820001d3e1a8/1239x697.jpg',
  duration: 45,
  creator: 'Edu Carmona'
}

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    return Recipe.create(myRecipe)
    
  }).then((recipe) => {
    console.log('\n// Iteration 2 - Create a recipe\n');
    console.log(`The recipe ${recipe.title} has been saved.\n`);

    return Recipe.insertMany(data)
  }).then((recipes) => {
    console.log('// Iteration 3 - Insert multiple recipes\n');

    recipes.forEach(recipe => {
      console.log(recipe.title);
    });

    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  }).then((recipe) => {
    console.log('\n// Iteration 4 - Update recipe\n');
    console.log(`The recipe has been updated.`);

    return Recipe.deleteOne({ title: 'Carrot Cake' })
  }).then(() => {
    console.log('\n// Iteration 5 - Remove a recipe\n');
    console.log(`The recipe has been deleted.`);

    return mongoose.connection.close();
  }).then(() => {
    console.log('\n// Iteration 6 - Close the Database\n');
    console.log(`The connection has been closed.`);
  })
  .catch(err => console.error('Error connecting to mongo', err));