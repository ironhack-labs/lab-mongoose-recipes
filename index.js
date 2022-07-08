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
      title: "Cereal con leche",
      level: "UltraPro Chef",
      ingredients: ["lechita", "cereal", "azucar"],
      cuisine: "Mex",
      dishType: "breakfast",
      Image: "https://comprarcereales.com/img/cms/cereales-americanos-con-leche.jpg",
      duration: "15",
      creator: "Chef Moises Vargas",
      created: "",
   })
      .then(recipe => 
        console.log(recipe))
      .catch(err =>
        console.log("ERROR / CREATE"))
  
  Recipe.insertMany(data)
      .then(console.log("Se agregaron datos nene!"))
      .catch(err =>
        console.log("ERROR / INSERT"))    
  })



  Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then(
    recipe => console.log("changes"))
  .catch((err) =>
      console.log("ERROR / UPDATE"))



      Recipe.deleteOne({ title: "Carrot Cake" })
      .then(doc => {
        console.log(`Deleted the recipe: ${doc.title}`);
      })
      .catch(err => {
        console.error(err);
      })

  .catch(error => {
    console.error('Error connecting to the database', error);
});



 