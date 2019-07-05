const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// User.create({ name: 'Alice', password:"ironhack2018", job: 'Architect' })
//   .then(user => { console.log('The user is saved and its value is: ', user) })
//   .catch(err => { console.log('An error happened:', err) });
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//iteration 2
// Recipe.create(data[1])
//   .then(recipie => {
//     console.log("A recipe was saved and its value is", recipie);
//   })
//   .catch(err => {
//     console.log("An error happened:", err);
//   });

//Iteration 3
// Recipe.insertMany(data)
//   .then(recipie => {
//     console.log("A recipe was saved and its value is", recipie);
//   })
//   .catch(err => {
//     console.log("An error happened:", err);
//   });

//Iteration 4
// Recipe.findByIdAndUpdate("5d1ebcb4895cc33071d3dcb3", { duration: 100 })
//   .then(recipe => {
//     console.log("It Worked.");
//   })
//   .catch(err => {
//     console.log("Didn't Work");
//   });

Recipe.findByIdAndRemove("5d1ebcb4895cc33071d3dcb2")
  .then(recipe => {
    console.log("It Worked.");
  })
  .catch(err => {
    console.log("Didn't Work");
  });
