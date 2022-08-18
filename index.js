const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
// Iteration 2: add one recipe
  .then(async () => {
    const myNewRecipe = await Recipe.create({
      title: 'Shakshouka',
      level: 'Easy Peasy',
      ingredients: ['tomatoes', 'vegetables', 'eggs', 'garlic', 'onion', 'parsley', 'paprika', 'harissa'],
      cuisine: 'Maghrebi',
      dishType: 'main_course',
      image: 'https://www.delscookingtwist.com/wp-content/uploads/2021/03/Traditional-Shakshuka-With-Feta-Cheese_1.jpg',
      duration: 40,
      creator: 'Ottoman Empire',
      created: new Date('1550-12-17T03:24:00')
    });
    console.log(myNewRecipe.title);
  })
// Iteration 3: add many recipes
  .then(async () => {
    const newRecipes = await Recipe.insertMany([... data]);
    newRecipes.forEach(recipe => console.log(recipe.title));
  })
// Iteration 4: update Rigatoni alla Genovese
  .then(async () => {
    const filter = { title: 'Rigatoni alla Genovese' };
    const update = { duration: 100 };
    const updatedRecipe = await Recipe.findOneAndUpdate(filter, update, {new: true});
    console.log('Rigatoni alla Genovese was updated: ', updatedRecipe.duration);
  })
// Iteration 5: delete carrot cake
  .then(async () => {
    await Recipe.deleteOne({title: 'Carrot Cake'});
    console.log('Carrot Cake successfully deleted.');
  })
// Iteration 6: close the DB
  .finally (() => {
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
