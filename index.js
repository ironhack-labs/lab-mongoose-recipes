const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const DB = "recipe-app"
const connectToMongo = async()=>{
  try {

   await mongoose.connect(`mongodb://localhost:27017/${DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log('Conectado a Mongo')

  } catch(err){
    console.log('Error:', err)
  }
}

connectToMongo()

//CREAR RECETAS
const createRecipe = async()=>{
  try{
    const recipe = await Recipe.create({
      
        "title": "Huevos fritos",
        "level": "Amateur Chef",
        "ingredients": [
          "2 large eggs",
          "teaspoon of salt",
          "teaspoon of pepper",
          "a little piece of olive oil"
        ],
        "cuisine": "Spanish",
        "dishType": "main_course",
        "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpazodevilane.com%2Fes%2Freceta%2Fhuevo-frito-perfecto%2F&psig=AOvVaw2PmWLeOi-bOw-ty73Zn9WA&ust=1636814066545000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjNwtuFk_QCFQAAAAAdAAAAABAD",
        "duration": 5,
        "creator": "Chef Arguiñano"
      
    })
    console.log("huevos fritos")
  }catch(err){
    console.log('ERROR: ', err)
  }
}

//createRecipe()

//iteration 3

const createAllRecipe = async()=>{
  try{
    const Allrecipes = await Recipe.insertMany(data)
    allRecipes.forEach((recipe) => {
      console.log("Recipe title", recipe.title)
    })
      

    console.log(allRecipes)
 
    
    
  }catch(err){
    console.log('ERROR: ', err)
  }

}
// createAllRecipe()

