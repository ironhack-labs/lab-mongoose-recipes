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
  .then( () => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Carbonara",
      level: "Easy Peasy",
      ingredients: ["pasta", "eggs", "cream", "bacon"],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 30,
      creator: "Daniel & Harry",
    })
  })
  .then( (pro) => {
    console.log(pro.title)
    return Recipe.insertMany(data)
  })
  .then( () => {
    data.forEach( (recipe) => {
      console.log(recipe.title)
    })
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  })
  .then( () => {
    console.log("Item updated")
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then( () => {
    console.log('Succesfully delted item')
    mongoose.connection.close()
    console.log("Connection closed")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
