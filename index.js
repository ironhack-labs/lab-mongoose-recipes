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
      title:"palomitas de pollo",
      level:"Easy Peasy",
      ingredients: ["chicken", "huebo"],
      cuisine:"Mexico",
      dishType:"snack",
      duration: 30,
      creator:"yo",
    }).then((recipe)=>{
      console.log(recipe.title)
    })
  ///
  Recipe.insertMany(data)
  .then((recipes)=>{
    recipes.forEach((recipe)=>{
      console.log(recipe.title)
    })


    
  }).finally(()=>{
    Recipe.findOneAndUpdate({
      title:"Rigatoni alla Genovese"
    }, {
      duration:100,
    }).then(()=>{
      console.log("updated")
    })


    Recipe.deleteOne({
      title:"Carrot Cake"
    }).then(()=>{
      console.log("deleted")
    }).finally(()=>{
      mongoose.connection.close()
    })
  
  })
  ////




  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


