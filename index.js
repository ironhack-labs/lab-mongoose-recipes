const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { findOneAndUpdate } = require('./models/Recipe.model');

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
  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made
  //   Recipe
  //     .create({ title: 'Arroz a la cubana', level: "Easy Peasy", ingredients: ["Arroz", "Tomate", "Salchichas", "Platano frito"], cuisine: 'Española', dishType: 'main_course', duration: 30, creator: "Me", created: 2022-04-13 })
  // })


  // ITERATION 3
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(newRecipes => newRecipes.forEach(elem => console.log(elem.title)))
  .then(() => {
   return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(() => {
    console.log("Borrado!!");
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log("Conexion finalizada")
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
