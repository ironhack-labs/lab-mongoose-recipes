const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "macarrones",
      level: "Easy Peasy",
      ingredients: "pasta, tomatoes",
      cuisine: "low kitchen",
      dishType: "main_course",
      duration: 30,
      creator: "valentin",
    })
  })
  .then((recipe) => {
    console.log(recipe.title);
   return Recipe.insertMany(data)
  })
  .then((data) => {
    console.log(data);
    Recipe.findOneAndUpdate({ title: { $eq: "Rigatoni alla Genovese" } }, { duration: 100 }, { new: true }) // UPDATE
        .then((data) => console.log("Promise -> ", data))
        .catch((err) => {
          console.log(err);
        });
    
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
   return Recipe.deleteOne({ title:  "Carrot Cake" })
    
  })
  .then((success) => {
    console.log(success)
  })
  
  
  .catch((err) => {
    console.log(err);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })

  .finally(() => {
    mongoose
      .disconnect
      .then(() => {
        console.log("disconnected to the database")
      })
      .catch(err => { 
      console.log("error disconnecting to the database", err)
    }) 
  })



