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
    return Recipe
    .create({
      title: "Sopa de platano", 
      ingredients: ['platano verde', 'papa', 'yuca', 'sal'], 
      cuisine: 'Colombiana', level: 'Easy Peasy', 
      dishType: 'soup', 
      duration: 60, 
      creater: 'chef'
    })
  })
  .then(() => {
    Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.updateOne(
      {title: "Rigatoni alla Genovese"},
      {duration: 100},
      {new: true}
      )
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() =>{ 
    mongoose.connection.close()
    .then(()=> console.log("conection closed"))
  })
  // .then((newRecipe) => console.log('Creado con exito: ', newRecipe))
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

Recipe.find()
  .then(recipes  => recipes.forEach((recipe) => {
    console.log(recipe.title)
    return recipe.title
    })
  )
  .catch((err) => console.log(err))
  
    // .then((newRecipe) => console.log('Creado con exito: ', newRecipe))
    // .catch(err=> console.log(err))

  

