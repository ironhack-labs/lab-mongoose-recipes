const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const newRecipe = {
      title: "pasta carbonara",
      level: "UltraPro Chef",
      ingredients: ["eggs","pasta","bacon"],
      cuisine:"italian",
      dishType:"main_course",
      duration:20,
      creator:"Lovro and Jonny",
      created: new Date()
    }
    return Recipe.create(newRecipe)
   // Run your code here, after you have insured that the connection was made
  })
  .then((e)=>{
    return Recipe.insertMany(data)
  })
  .then((e)=>{
    e.forEach((recipe)=>{
      console.log(recipe.title)
    })
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100})
  })
  .then((e)=>{
    console.log(`done`)
    return Recipe.deleteOne({title:"Carrot Cake"})
  })
  .then((e)=>{
    console.log(" remove done ")
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  