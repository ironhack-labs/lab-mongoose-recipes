const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipe-app';

async function myRecipeSetter(){
  await mongoose.connect(MONGODB_URI)
  await Recipe.deleteMany();
  let tomatoRecipe = await Recipe.create({
    title: "Tomato Tofu",
    level: "Easy Peasy",
    ingredients: ['Extra Firm Tofu','Tomato','Onion','Fish Sauce','Tomato Paste'],
    cuisine: 'Vietnamese',
    dishType: 'main_course',
    duration: 30,
    creator: 'Amanda',
  })
    console.log(tomatoRecipe.title);
  let myRecipeArray = await Recipe.insertMany(data);
    for(let i = 0; i < myRecipeArray.length; i++){
      console.log(myRecipeArray[i].title)
  }
  let updateRigatoni = await Recipe.findOneAndUpdate({'title': 'Rigatoni alla Genovese'}, {'duration': 100});
    console.log(`Updated Rigatoni`);
  let deleteCake = await Recipe.deleteOne({title: 'Carrot Cake'});
    console.log('No more Carrot Cake!');
}

mongoose.connection.close();

myRecipeSetter();