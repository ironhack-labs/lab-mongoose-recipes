const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI)
//   .then(x => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
  //   return Recipe.deleteMany()
  // })
  // .then(() => {
    // Run your code here, after you have insured that the connection was made
  // })
  // .catch(error => {
  //   console.error('Error connecting to the database', error);
  // });

  const cook = async function(){
    try{
      const x = await mongoose.connect(MONGODB_URI)
      console.log(`Connected to the database: "${x.connection.name}"`)
      removeRecipes()
      addRecipe()
      addRecipes()
      updateRecipe()
      deleteRecipe()
      mongoose.connection.close()
    }catch(err){
      console.log(err)
    }
  }
  const removeRecipes = async function(){
    try{
      const bye = await Recipe.deleteMany()
    } catch(err){
      console.log(err)
    }
  }
  const addRecipe = async function( ) {
    try {
      const recipe = await Recipe.create({title: "Butter & bread", level: "Easy Peasy", ingredients: ["butter", "bread"], cuisine: "Mongolian", dishtype: "other", duration: 5, creator: "Giuliano" });
      console.log(recipe)
    } catch (err){
      console.log(err)
    }
  }

  const addRecipes = async function() {
    try {
      const recipe2 = await Recipe.insertMany(data);
      for(let i = 0; i < data.length; i++){
        console.log(data[i].title)
      }
    } catch (err){
      console.log(err)
     }
   }

   const updateRecipe = async function() {
    try {
      const tt = await Recipe.findOneAndUpdate(({title:"Rigatoni alla Genovese"}),({duration: 100}));
      console.log("You did it!")
    } catch (err){
      console.log(err)
    }
  }

  const deleteRecipe = async function() {
    try{
      const cc = await Recipe.deleteOne({title: "Carrot Cake"})
      console.log("You did it!")

    }catch (err){
      console.log(err)
    }
  }
  // addRecipe()
  //  addRecipes()
  // updateRecipe()
    // deleteRecipe()
  mongoose.connection.close()
