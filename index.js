const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
   return Recipe.create({
      title: "caipirinha",
      level: "Easy Peasy",
      ingredients: ["cachaça", "lemon", "sugar"],
      cuisine: "Brazilian",
      dishType: "drink",
      duration: 10
    })
  })
  .then(recipe => {
    console.log("new recipe created " + recipe)
    return recipe.save();
  })
  .catch(error=> {
    console.log("erro ao criar", error)
  })
  .then(()=> {
    return Recipe.insertMany(data)
  })
  .then(allRecipes=> {
    allRecipes.forEach((oneRecipe) => {
      console.log(oneRecipe.title)
    })
  })
  .catch(error => {
    console.log("erro ao inserir o data", error)
  })
  .then(()=>{
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese" }, {duration: 100}, {new:true})
  })
  .then(recipe=> {
    console.log(recipe);
    console.log("Receita atualizada!")
  })
  .catch(error => {
    console.log(error);
  })
  .then(()=>{
    return Recipe.deleteOne({title:"Carrot Cake"})
  })
  .then(()=> {
    console.log("carrot cake removed");
  })
  .catch(error=>{
    console.log("erro ao remover o carrot cake do menu", error)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
