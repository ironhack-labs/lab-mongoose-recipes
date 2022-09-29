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
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const firstRecipe = {
      title: "Luis' Pizza",
      level: "Amateur Chef",
      ingredients: ["cheese", "tomato", "string"],
      dishType: "main_course",
      duration: 30,
      creator: "Luis Junco",
      cuisine: "italian"
    }
    return Recipe.create(firstRecipe)
  })
  .then( () => {
    const recipeArr = Recipe.insertMany(data)
    return recipeArr
  })
  .then((arr) => {
    arr.forEach( element => console.log(element.title) )
   return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, { returnDocument: 'after' });
  })
  .then(() => {
    console.log("Your recipe was updated!!!");
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then( () => {
    console.log("The carrot cake was removed successfully")
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
