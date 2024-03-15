const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      title: 'Lasagna',
      level: 'Easy Peasy',
      ingredients: ['Lasagna noodles','sauce', 'cheese'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 50,
      creator: 'Amanda Koch',
      created: Date.now()
    };
    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) => {
    console.log(`New recipe added: ${createdRecipe.title}"`)
    return Recipe.insertMany(data);
  })
  .then((insertedRecipes) => {
    console.log("Inserted recipes from data.json:");
    insertedRecipes.forEach(recipe => {
      console.log(recipe.title);
    });
    return Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'},
      {duration: 100}      
    );
  })
  .then((updatedRecipe) => {
    console.log(`Updated duration for 'Rigatoni alla Genovese' recipe: ${updatedRecipe.duration}`);
    return Recipe.deleteOne({title: 'Carrot Cake'});
  })
  .then (() => {
    console.log(`Removed 'Carrot Cake' recipe`);
    // Close the database connection
    return mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
