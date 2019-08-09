const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


Recipe
  .create({ title: "Minestrone", level: "Easy Peasy", ingridients: ["tomatoes", "potatoes", "cabbage", "onion"], cuisine: 'Italian', dishType: "Other", duration: 30, creator: "Me"})
    .then( newRecipe => console.log("New recipe was created: ", newRecipe))
    .catch( err => console.log("Something went wrong ", err));

Recipe
  .insertMany(data)
  .then(manyMeals => console.log('Meal ${manyMeals.title} is inserted') )
  .catch( err => console.log("Something went wrong ", err));

Recipe
    .findOneAndUpdate({title: "Rigatoni alla Genovese"} , { $set: { duration: 100}})
    .then(newRigatoni => console.log("Success!", newRigatoni))
    .catch( err => console.log("Error while fixing rigatoni: ", err));
  
Recipe
  .deleteOne({title: "Carrot Cake"}) 
  .then(byeByeCake => console.log("Oh, no carbs for you! Forget about ", byeByeCake))
  .catch( err => console.log("Keeping my sugar, because ", err)); 