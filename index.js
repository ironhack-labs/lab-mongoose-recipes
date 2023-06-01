const {mongoose, Schema} = require('mongoose');

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
    console.log("Ola and Nishtha's Recipe added");
    return Recipe.create({
      title: "Loopey's Spagheti",
    level: "UltraPro Chef",
    ingredients: [
      
      "1 cup Water",
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 Sauce",
      "salt",
      "Spagheti"
    ],
    cuisine: "Polish",
  dishType: "main_course",
    image: "C:\ironhack-labs\lab-mongoose-recipes\spaghetti.jpg",
    duration: 30,
    creator: "Chef Ola"
    });

    // Run your code here, after you have insured that the connection was made
  })
  .then((createRecipe) => {
    console.log(createRecipe);
 return Recipe.insertMany(data);
   
  })
  .then((insertedRecipes) => {
    insertedRecipes.forEach(Recipe);{
      console.log(Recipe.title);
 };
})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
