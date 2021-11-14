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

//iteration 4 - UPDATE

//findOneAndUpdate() al primer argument posem un key xq trobi el document que volem canviar, i al segon hi posem el valor a modificar. si en volem modificar més d'1 ho anem posant entre {} i separats per ,
//Posar {new: true} xq em retorni l'estudiant actualitzat 
//explicació JJ ---> .findOneAndUpdate(<target>, <elementos que quiero cambiar>, {new: true}) --> Este metodo nos va a buscar un documento (target) y lo va a editar según los elementos que hayamos pasado en el segundo argumento (dentro de un objeto literal)

const updateRecipe = async ()=>{
  try{
    const recipe = await Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'}, 
      {duration: 100},
      {new: true}
    )
    console.log('Rigatoni alla Genovese; duration succesfully modified')
  }catch(err){
    console.log('error: ', err)
  }
}

  // updateRecipe()

  //iteration 5 - Remove a recipe

const deleteOneRecipe = async ()=>{
  try{
    const deleteRecipe = await Recipe.findOneAndDelete({title: "Carrot Cake"}) 
    console.log('Carrot cake doc. has been succesfully removed')
  }catch(err){
    console.log(err)
  }
}

// deleteOneRecipe() 