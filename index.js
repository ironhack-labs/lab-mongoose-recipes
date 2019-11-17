const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
const arr = []
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  //Create a recipe//
  const recipe1 = {
    title: "Enchiladas verdes",
    level: "UltraPro Chef",
    ingredients: ["tortilla", "tomates", "chiles verdes", "crema", "queso", "pollo deshebrado"],
    cuisine: "Mexican",
    dishType: "Dish",
    duration: 20,
    creator: "Itza"
  };

  let a = Recipe.create(recipe1)
  .then(recipe => {
    console.log(`'${newRecipe.title}' created`);
  })
  .catch(err => {
    console.log(err);
  });


// //Insert Many recipes//

  let b = Recipe.create(data)
  .then(recipes => {
    console.log(`Acabas de crear ${recipes.length} recetas`);
  })
  .catch(err => {
    console.log(err);
  });

//Update recipe//

let c = Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 },
  { new: true }
)
  .then(recipe => {
    console.log(`duration of ${recipe} successfully changed`);
  })
  .catch(err => {
    console.log(err);
  });


//Remove a recipe//

let d = Recipe.deleteOne({ title: "Carrot Cake" })
  .then(cake => {
    console.log(`${cake} 🍰 deleted`);
  })
  .catch(err => {
    console.log(err);
  });

//Close the Database//

Promise.all([a, b, c, d])
  .then(() => {
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });

  