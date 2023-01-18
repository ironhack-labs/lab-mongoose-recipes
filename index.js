const mongoose = require('mongoose');



// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const recipeNew = require('./models/create');


//************ INTERACTION 2***********

//TITULO DE LAS RECETAS EN LA CARPETA: Recipe.model.js

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';
//mongodb://127.0.0.1:27017/recipe-app'
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => { 
//************ INTERACTION 3***********

    return Recipe.insertMany( data )
  
  })
  .then(() =>{
    
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    
  })
  //**************INTERACTION 4-5-6********
  .then(() => {

    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, { duration: 100})
    
  })
  .then(recipe => {

    console.log(`The new duration is: ${recipe.duration}`)


    return Recipe.findOneAndDelete({title: "Carrot Cake"})

  })
  .then(deleteRecipe => console.log(`Recipe ${deleteRecipe.title} has been delete`))

  
  .catch(err => console.log('Error connecting to the database', err))

  
  .finally(()=> mongoose.connection.close())//cerrar conexión.



 