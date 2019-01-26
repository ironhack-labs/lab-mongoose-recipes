const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/recipes.models');


mongoose.connect('mongodb://localhost/recipeApp')
.then(() => {
    console.log('Connected to Mongo!');
}).catch(err => {
    console.error('Error connecting to mongo', err);
});

Recipe.create({
  title: "PB & J",
  level: 'UltraPro Chef',
  ingredients: ['Peanut Butter', 'Jelly', 'Bread'],
  cuisine: 'American',
  dishType: 'Snack',
  
})
  .then( newRecipe => {
    console.log(`Recipe ${newRecipe.title} was succesfully added`);
  })
  .catch(err => {
    console.log("Error while adding new recipe to DB ", err);
})

Recipe.insertMany(data)
.then( newRecipe => {
  console.log(`Recipe has been added to DB: ${newRecipe.title}`);
})
.catch(error => {
  console.log("Error adding all recipes to DB: ", error);
})


Recipe.findByIdAndUpdate('5c4bd1451652d283e256877a', { duration: 100})
.then( update =>{
  console.log(`Recipe has been succesfully updated`);
})
.catch(error => {
  console.log("Error updating recipe: ", error);
})

Recipe.findByIdAndDelete('5c4bd1451652d283e2568779')
.then( deleted => {
  console.log(`${deleted.title} was succesfully removed from DB`);
})
.catch(error => {
  console.log(`Error removing recipe from DB`);
})


process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 