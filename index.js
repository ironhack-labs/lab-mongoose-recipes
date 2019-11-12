const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const recipes = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipe = { 
  title: 'What', 
  level: "Easy Peasy", 
  ingredients: ["meat", "cheese", "tomato"],
  cuisine: "Italian",
  dishType: "Dish",
  image: "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiczLbOkLrlAhXUBGMBHcSQBEkQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.superama.com.mx%2Frecetas%2Flasana%2F1757&psig=AOvVaw1CE2_AXnDPzgv9bsUbUZ-c&ust=1572186325375703",
  duration: 20,
  creator: "Sergio",
}

Recipe.create(recipe)
 .then((recipe) => {
   console.info('========== Iteration 2');
   console.info('- Created recipe', recipe.title);
   return Recipe.insertMany(recipes)
 })
 .then((recipes) => {
   console.info('========== Iteration 3');
   for (let recipe of recipes) {
     console.info('- Created recipe', recipe.title);
   }
   return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true });
 })
 .then((recipe) => {
   console.info('========== Iteration 4');
   console.info(`${recipe.title} successfully updated!`);
   return Recipe.findOneAndRemove({ title: 'Carrot Cake' });
 })
 .then((recipe) => {
   console.info('========== Iteration 5');
   console.info(`${recipe.title} successfully removed!`);
 })
 .catch(error => console.error(error))
 // .then(() => {
 //   console.info('========== Cleaning database...');
 //   return mongoose.connection.dropDatabase();
 // })
 .then(() => {
   console.info('========== Closing database...');
   return mongoose.connection.close()
 })
 .catch(error => console.error(error));

