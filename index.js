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

  /*
Recipe.create({
  title: "abc",
  level: "Easy Peasy",
  ingredients: ["a", "b"],
  cuisine: "exxquisite"
})
  .then(document => {
    console.log(document.title);
  })
  .catch(err => {
    console.log("ERROR: ", err);
  });*/

Recipe.insertMany(data)
  .then(document => {
    document.forEach(dish => {
    console.log(dish.title);
    })
    Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then(document => {
        console.log("updated successfully");
      })
      .catch(err => {
        console.log("ERROR: ", err);
      });
    Recipe.deleteOne({title: "Carrot Cake"})
      .then(document => {
        console.log("deleted successfully");
        mongoose.disconnect();
      })
      .catch(err => {
        console.log("ERROR: ", err);
      });
  })
  .catch(err => {
    console.log("ERROR: ", err);
  });
