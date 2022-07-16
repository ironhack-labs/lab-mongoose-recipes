const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
   
  //Creating one recipe  
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Create new recipe
    const recipe = new Recipe({
      title: 'Donuts',
      level: 'Easy Peasy',
      ingredients: 'flour, egg, milk',
      cuisine: 'Bakery',
      dishType: 'snack',
      duration: 40,
      creator: 'Marina BG',
    })

    recipe
    .save()
    .then((recipe) => console.log(recipe.title))
  }) 
 
   //Creating many recipes
  .then(() => {
    return Recipe.insertMany(data);
  })

  .then((arrRecipes) => {
    arrRecipes.forEach((recipe) => console.log(recipe.title));

    //Update recipe
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese"},
      { duration: 100},
      { new: true}
    )    
  })

  .then((result) => {
    console.log('Update Ok!', result);

    //Delete one recipe
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })

  .then((result) => {
    console.log('Delete Ok!', result)

    mongoose.connection.close(function () {
      console.log("Mongoose disconnected on app termination");
      process.exit(0)}
    )
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
