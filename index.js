const mongoose = require('mongoose');
const recipes = require('./data.json')

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
  .then(() => Recipe.syncIndexes())
  .then(() => {

    const myRecipe = { title: "Kiviak", level: "Amateur Chef", ingredients: ["seal skin", "seal fat", "500 little auks"], cuisine: "Greenland", dishType: "main_course", image: "https://img.wattpad.com/298215cef3a52d07f2044003230fdecc44d3e55a/687474703a2f2f7777772e7065707065722e70682f77702d636f6e74656e742f75706c6f6164732f323031332f31302f6b697669616b2e6a7067?s=fit&h=360&w=360&q=80", duration: 18, creator: "inuits" }
    recipes.push(myRecipe)
    return Recipe
      .create(recipes)
  })
  .then(() => {
    return Recipe
      .find()
      .then(allRecipes => allRecipes.forEach(elm => console.log(elm.title)))
  })


  .then(() => {
    return Recipe
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then(console.log("D U R A T I O N    U P D A T E D "))
  })
  .then(() => {
    return Recipe
      .findOneAndDelete({ title: 'Carrot Cake' })
      .then(console.log("E L E M E N T    D E L E T E D"))
  })

  .then(() => {
    return Recipe
      .find()
      .then(allRecipes => allRecipes.forEach(elm => console.log(elm.title)))
  })
  .then(() => mongoose.connection.close())

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
