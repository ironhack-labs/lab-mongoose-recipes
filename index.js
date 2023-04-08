const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    
    return Recipe.deleteMany()
  })
  .then(() => {
    try{
      main(data)
    }
    catch(error){
      console.error(error)
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

async function main(data){
    //Iteration 3: introduce the data from data.js
    await Recipe.insertMany(data)
    console.log('The recipes that has been introduced')
 
    const recipesTitles = await Recipe.find({},{title:1, _id:0})
    console.log('The title of the recipe are', recipesTitles)

    //Iteration 4: update the recipe
    const recipeTitle = "Rigatoni alla Genovese"
    const newDuration = 100
    await Recipe.findOneAndUpdate({title: recipeTitle}, {duration: newDuration})
    console.log(`The duration of ${recipeTitle} has been updated to ${newDuration}`)

    //Iteration 5: remove the recipe
    const recipeToDelete = "Carrot Cake"
    await Recipe.deleteOne({title: recipeToDelete})
    console.log(`Sorry, but the ${recipeToDelete} has been deleted`)

    //Iteration 6: close the database
    // await Recipe.find({}).then(FinalData => console.log(FinalData)) //→uncomment this line to see the final data
    mongoose.connection.close(()=>console.log('The connection to the database has ended'))
}

