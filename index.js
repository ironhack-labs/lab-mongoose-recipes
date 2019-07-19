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
mongoose.set('useFindAndModify', false);


// Recipe.create({
//   title: "Fruit salad",
//   level: "Easy Peasy",
//   ingredients: ["Apple","Orange","Blueberry","Kiwi","Grapes"],
//   cuisine: "international",
//   dishType: "snack",
//   image: "https://www.metro.ca/userfiles/image/recipes/salade-fruits-gingembre-confit-7034.jpg",
//   duration: 1,
//   creator: "",
//   date: 19/07/2019,
// }).then((newRecepie) => {
//   console.log(newRecepie.title);
// }).catch(err => {
//   console.log(err);
// });

let promise1 = Recipe.findByIdAndUpdate("5d3189e77edc163070c8e071", {duration: 100})
  .then(updatedRecepie => console.log(`${updatedRecepie.title} updated successfully`))
  .catch(err => console.log("Recepie has not been updated!"));

let promise2 = Recipe.deleteOne({title: "Carrot Cake"})
  .then(removedRecepie => console.log(`The recepie has been deleted`))
  .catch(err => console.log(`The recepie has not been removed`))

Promise.all([promise1,promise2])
.then(() => {
  mongoose.connection.close()})
.catch(err => console.log("Connection is still on"))