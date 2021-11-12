
// Import mongoose to index.js 

const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

const connectToMongo = async()=>{
  try{
  await  mongoose.connect('mongodb://localhost:27017/recipe-app',{
   useCreateIndex:true,
   useNewUrlParser: true,
   useUnifiedTopology: true,
}) 
console.log('Connected to the database: recipe-app 🥘 ')

   }catch(err){
       console.log ('Error connecting to the database', error)
   }

}

connectToMongo()


// Create recipe 

const createRecipe = async()=>{
  try{
    const recipe = await Recipe.create({
      title: "Pavlova",
      level:"UltraPro Chef",
      ingredients: [
        "4 egg whites",
        "250g caster sugar",
        "1 tsp white wine vinegar",
        "1 tsp cornflour",
        "1 tsp vanilla extract",
        "500g strawberries, hulled and halved",
        "200g redcurrants, stalks removed",
        "3 tbsp icing sugar",
        "350ml double cream",
      ],
      cuisine:"New Zeland",
      dishType: "dessert",
      image:"https://i.blogs.es/2491a8/minipavlova-dap/1366_521.jpg",
      duration:180,
      creator: "Adriano",
    })
    console.log (recipe.title)
  } catch(error){
    console.log ('Error connecting to the database', error)
}
}

// createRecipe()


// Create multiple recipes

const createMultipleRecipes = async()=>{
  try{
    const recipes = await Recipe.insertMany(data)
    console.log (recipes.title)
  } catch(error){
    console.log ('Error connecting to the database', error)
}
}

// createMultipleRecipes()

