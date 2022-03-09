require("dotenv").config();
const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = process.env.MONGO_URI;

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany(data);
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {$set : {duration: 100}});
  })
  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

//  const showRecipes = async () => {
//   const recipe = await Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {$set : {duration: 100}});
//   console.log(recipe)
// };

// setTimeout(() => {
//   showRecipes();
// }, 10000);
