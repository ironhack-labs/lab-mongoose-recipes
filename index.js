const mongoose = require('mongoose');
const schema = mongoose.Schema;

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
    return Recipe.deleteMany()
  })
 
  

  then(() => {
    // Run your code here, after you have insured that the connection was made
    const myRecipe = {
      title: "Chicken Chowmein",
      ingredients: ["Chicken", "Carrots", "Beansprouts"],
      cuisine: "Chinese"
    };
    return Recipe.create(myRecipe);
  })
.then((response) => {
  console.log(response);
})
  .then((recipe) => {
    console.log(recipe.title);
    return Recipe.insertMany(data)
  })
 

  Recipe.find() 
  .then(recipeSchema => {
      // recipeFromDB is a placeholder and represents an array of recipe instances
    recipeSchema.forEach(Recipe => console.log(` --> recipe: ${Recipe.title}`));
  })
  .catch(error => console.log(`Error occured getting recipe from DB: ${error}`));


  then(() => {
  const query = {title: "Rigatoni alla Genovese"};
Recipe.findOneAndUpdate(query, { duration: 25 }, options, callback)
Recipe.findOneAndUpdate(query, { $set: {duration: 100}}, options, callback )
.then((success) => {
  console.log(success);
})




