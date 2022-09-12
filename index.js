const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
    // iteration 2- create a recipe
   .then( () => {

    let myRecipe = {
      title: 'Sweet Mashed Potatoes',
      level: 'Easy Peasy',
      ingridients: ['potatoes', 'milk', 'salt', 'melted sugar','mayonnaise'],
      cuisine:"American",
      dishType: "main_course",
      duration: 30,
      creator: 'Chef Jonathan'
    
    }
   Recipe.create(myRecipe)
   .then( (recipe) => {
     console.log(`recipe title: ${recipe.title}`);
     console.log(recipe);
   })
   .catch((error) => {
    console.log('An error ocurred saving recipe to mongo',error)
   });
  });
      // iteration 3- insert multiple recipes
    
      Recipe.insertMany(data)
      .then( recipes => {
         console.log('recipe titles:');
        recipes.forEach( recipe =>{
          console.log( recipe.title)
        })
      })
      .catch( error => console.log('Error ocurred getting recipes',error));
  
 

  // Iteration 4 -update recipe : 
  // the Rigatoni alla Genovese should take 100 instead of 220

  Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100})
  .then( recipe => {
    console.log(`the duration of the ${recipe.title} recipe was updated.`)
  })
  .catch( error => console.log('Error updating recipe', error));

// // iteration 5- remove a recipe

Recipe.deleteOne({title:'Carrot Cake'})
.then( (recipe) => {
  console.log(`recipe has been successfully deleted.`)
  mongoose.connection.close(); // iteration 6- close the database
})
.catch( error => console.log('Error ocurred deleting recipe.', error));

             
      