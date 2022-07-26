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
    Recipe.create({
      title: "Cereal con leche y miel",
      level: "UltraPro Chef",
      ingredients: ["lechita", "cereal", "miel", "azucar", "agua"],
      cuisine: "Mex",
      dishType: "breakfast",
      Image: "https://comprarcereales.com/img/cms/cereales-americanos-con-leche.jpg",
      duration: "5",
      creator: "Chef le Samuel Ignacie",
      created: "",
   })
   .then(recipe => 
    console.log(recipe))
  .catch(err =>
    console.log("ERROR!"))

    Recipe.insertMany(data)
    .then()
    .catch(err =>
      console.log("ERROR!"))

      Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then( recipe => console.log("Update successful"))
      .catch((err) => console.log(err))

      //Iteracion 5

      //Recipe.deleteOne({title: "Carrot Cake"})
      //.then( recipe => console.log("eliminado"))
      //.catch((err) => console.log(err))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });