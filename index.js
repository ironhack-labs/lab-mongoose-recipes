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

// Recipe.create({
//   title: "Fried Bananas",
//   level: "UltraPro Chef",
//   ingredients: ["bananas", "oil"],
//   cuisine: "American",
//   dishType: "Breakfast",
//   image: "https://images.media-allrecipes.com/images/75131.jpg.",
//   duration: 2,
//   creator: "Kyle & Toska"
// }).then(document => {
//   console.log(document);
// }).catch(err => {
//   console.log("ERROR", err);
// });


Recipe.insertMany(data).then(document => {
  console.log(document);
}).catch(err => {
  console.log("ERROR", err);
});

Recipe.updateOne({
  title: "Rigatoni alla Genovese"
}, {
  duration: 100
}).then(response => {
  console.log("yeay the recipe was updated", recipe);
}).catch(err => {
  console.log("ERROR", err);
});


Recipe.deleteOne({
  title: "Carrot Cake"
}).then(response => {
  console.log();
}).catch(err => {
  console.log("ERROR", err);
});