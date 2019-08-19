const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
  title: 'Angel Chicken Pasta',
  level: 'Easy Peasy',
  ingredients: [
    '6 skinless, boneless chicken breast halves', 
    '1/4 cup butter', '1 (.7 ounce) package dry Italian-style salad dressing mix', 
    '1/2 cup white wine',
    '4 ounces cream cheese with chives',
    '1 pound angel hair pasta'
  ],
  cuisine: 'Italian',
  dishType: 'Dish',
  duration: 90,
  creator: 'Marian Collins',
})
  .then((recipe) => { console.log(`Recipe was saved! Recipe title: ${recipe.title}`); })
  .catch((error) => { console.log('An error occured:', error); });

Recipe.insertMany(data)
  .then((recipes) => {
    console.log(`Array of recipes was saved!`);
    recipes.forEach((recipe) => {
      console.log(`Recipe name: ${recipe.title}`);
    });
    Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
      .then(() => {
        console.log('Update successfull!');
      })
      .catch((error) => {
        console.log(`An error occurred: ${error}`);
      });
    Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(() => {
        console.log('Delete successfull!');
        mongoose.connection.close()
          .then(() => {
            console.log('Connection closed');
          })
          .catch((error) => {
            console.log(`An error occurred while closing the connection: ${error}`);
          });
      })
      .catch((error) => {
        console.log(`An error occurred: ${error}`);
      });
  })
  .catch((error) => { console.log(`An error occured: ${error}`); });
