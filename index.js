const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


//Iteration 2 - Create a recipe
// Recipe.create({
//   title: "Pollo a la Brasa",
//   level: "Amateur Chef",
//   ingredients: ["pollo", "aceite", "patatas", "ensalada", "aliño"],
//   cuisine: "peruvian",
//   dishType: "Dish",
//   image: "",
//   duration: 60,
//   creator: "Daniel",
//   created: ""
// }).then(recipeData => {
//   console.log("my recipe is in data base", recipeData);
// }).catch(err => {
//   console.log(err, " Error");
// })


// Iteration 3 - Insert Many recipes
// Recipe.insertMany(data)
//   .then(recipesData => {
//     console.log(recipe.title);
//   }).catch(err => {
//     console.log(err, " error");
//   })


//Iteration 4 - Update recipe
// Recipe.findOneAndUpdate({
//   title: "Rigatoni alla Genovese"
// }, {
//   $set: {
//     duration: 100
//   }
// }).then(recipeData => {
//   console.log("Great! The data are saved well");
// }).catch(err => {
//   console.log(err, " error");
// })

//Iteration 5 - Remove a recipe
// Recipe.deleteOne({
//     title: "Carrot Cake"
//   })
//   .then(recipeData => {
//     console.log("Great! The data are removed!");
//   }).catch(err => {
//     console.log(err, " error");
//   })

//Iteration 6 - Close the Database
mongoose.connection.close();
// mongoose.disconnect();