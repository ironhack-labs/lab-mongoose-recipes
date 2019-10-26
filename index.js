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

//ITERATION 2

  // Recipe.create({
  //   title: "Pasta bolognesa",
  //   level: "Easy Peasy",
  //   ingredients: ["Pasta", "Cream", "Bacon", "pepper"],
  //   cuisine: "Italian",
  //   dishType: "Dish",
  //   image: "https://d1doqjmisr497k.cloudfront.net/-/media/schwartz/recipes/2000x1125/easy_spaghetti_carbonara_2000.jpg?vd=20180522T020207Z&hash=9B103A2DB3CDCB31DB146870A3E05F9856C051A2",
  //   duration: 30,
  //   creator: "Renato Gualandi",
  //   created: "1959"
  // }).then(data => console.log(data)
  // ).catch(error => console.log("error"))

//ITERATION 3

  // Recipe.insertMany(data)
  // .then(data => {
  //   data.forEach(recipe => console.log(recipe.title));
  //   })
  // .catch(error => console.log("error"))

//ITERATION 4

// Recipe.updateOne({title: "Rigatoni alla Genovese"},{duration: 100})
//   .then(data => {
//     console.log(data);
//     })
//   .catch(error => console.log("error"))

//ITERATION 5

// Recipe.deleteOne({title: "Carrot Cake"})
//   .then(data => console.log(`You succesfuly delete the recipe!`))
//   .catch(console.log("Error"))

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});