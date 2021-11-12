const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

//Interaction 2 - Create a new Recipe

  const createRecipe = async()=>{
    try{
      const recipe = await Recipe.create({
        title: 'Pastel de natas',
        level: 'UltraPro Chef',
        ingredients: ['leche', 'harina', 'azucar', 'huevos'],
        cuisine: 'bakery',
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.livingtours.com%2Fpt%2Fblog%2Fa-diferenca-entre-pastel-de-nata-e-pastel-de-belem.html&psig=AOvVaw0p5anKQ1-EGPGczyb9rVSr&ust=1636812152286000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjoy8n-kvQCFQAAAAAdAAAAABAD',
        duration: 120,
        creator: 'undefined',
      })
      console.log(recipe)
    }catch(err){
      console.log('ERROR: ', err)
    }
  }
// createRecipe()

  //Interaction 3 - Insert multiple recipes

    const insertRecipes = async()=>{
    try{
      const recipes = await Recipe.insertMany(data)
      console.log(recipes)
    }catch(err){
      console.log('ERROR: ', err)
    }
  }
// insertRecipes()

//Interaction 4  -  Update recipe

  const updateRecipe = async ()=>{
    try{
        const updatedRecipe = await Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
        console.log(`The recipe is already deleted` )
    }catch(err){
        console.log("error", err)
    }
}
//updateRecipe()

//Iteration 5 - Remove a recipe

const deleteRecipe = async ()=>{
  try{
    const deletedRecipe = await Recipe.findOneAndDelete({title: 'Carrot Cake'})
    console.log(`The recipe Carrot Cake is already deleted`)
  }catch(err){
    console.log(err)
  }
}
//deleteRecipe()

//Iteration 6 - Close the Database

mongoose.connection.close()