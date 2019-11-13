const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



Recipe.collection.drop()
Recipe.create({
    title: 'Fluffiest Pancakes Ever',
    level: 'Easy Peasy',
    ingredients: ['2 eggs', '1 cup flour', '1/2 water', '1/2 milk', 'lots of sugar', 'a pinch of salt', 'little bit of butter'],
    cuisine: 'American',
    dishType: 'Breakfast',
    image: 'https://media.eggs.ca/assets/RecipePhotos/_resampled/FillWyIxMjgwIiwiNzIwIl0/Fluffy-Pancakes-New-CMS.jpg',
    duration: 20,
    creator: 'Chef Rebenino',
  })
  .then(theRecipe => console.log(`new recipe title is ${theRecipe.title}`))
  // .then(x => Recipe.find({}))
  // .then(newRecipe => console.log(`${newRecipe.title}`))
  .then(x => Recipe.insertMany(data))
  .then(allRecipes => {
    allRecipes.forEach(recipe => console.log(recipe.title))
  })
  .then(x => Recipe.updateOne({
      title: 'Rigatoni alla Genovese'
    }, {
      duration: 100
    })
    .then(msg => console.log(msg))
    .catch("error with updating the rigatoni"))
  .then(x => Recipe.deleteOne({
    title: "Carrot Cake"
  }))
  .then(msg => console.log(msg))
  .catch("error with deleting the carrot cake")
  .catch(err => console.log(`Error with all recipes ${err}`))
  .then(mongoose.connection.close())


mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));
mongoose.connection.on('error', (err) => console.log(`Mongoose default connection error: ${err}`));
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});