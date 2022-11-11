const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'

const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');
const { create } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made
  //   Recipe.create({title: "Pizza", level: "Easy Peasy", cuisine: "italian"})
  //     .then(createdRecipe => console.log(createdRecipe))
  //     .catch(err => console.log(err))
  // })
  .then(() => {
    return Recipe.insertMany(data)
      .then(createdRecipe => {
       createdRecipe.forEach(element => {
        console.log(element.title)
       })
  })
      .catch(err => console.log(err));
  })
  .then(()=> {
   return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100 },{new: true})
    .then((Recipe => console.log(Recipe)))
    .catch(error => {
      console.error('Error Update', error);
  })
  })
.then(()=> {
  return Recipe.deleteOne({title:"Carrot Cake"})
    .then(deletedRecipe => console.log(deletedRecipe))
    .catch(err => console.log(err))
})  
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  
 .then(()=> {
  mongoose.connection.close()
 })

