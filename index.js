const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

let newRecipe = {
  title: 'Omelette',
  level: 'Easy Peasy',
  ingredients: ['Eggs', 'Cheddar cheese', 'Salt', 'Pepper'],
  cuisine: 'American',
  dishType: 'Breakfast',
  duration: 10,
  creator: 'Chef Gusteau'
}

Recipe.create(newRecipe)
  .then(Recipe => console.log(Recipe.title, 'has been added to the list!')
  .catch(error => console.log('An error ocurred and the recipe could not be added to the list')));

Recipe.insertMany(data)
  .then(response => data.forEach(recipes => console.log('Recipe title: ', recipes.title)))
  .catch(error => console.log('An error ocurred and the recipes could not be retrieved from the list', error));

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, { duration: 100})
  .then(response => console.log('Update successful!'))
  .catch(error => console.log('Update was not successful.'));

Recipe.deleteMany({title: 'Carrot Cake'})
  .then(response => console.log('Removal successful!'))
  .catch(error => console.log('Removal was not successful.'));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
    });
});