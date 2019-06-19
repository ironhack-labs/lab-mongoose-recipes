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

Recipe.create({
  title: "Mushroom omelet",
  level: "Easy Peasy",
  ingredients: ["eggs", "mushrooms", "oignon", "parsley", "salt", "pepper"],
  cuisine: "French",
  dishType: "Breakfast",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 10,
  creator: "Camille",
  created: Date()
})
.then (dbResponse => {
  console.log("recipe added:" + dbResponse.title);
})
.catch (err => {
  console.log(err);
});

Recipe.insertMany(data)
.then(res => {
  console.log("recipes added");
})
.catch(err => {
  console.log("error adding recipes");
});

Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
.then(res => {
  console.log("successfully updated recipe");
})
.catch(err => {
  console.log("error updating recipe");
});

Recipe.deleteOne({ title: "Carrot Cake "})
.then(res => {
  console.log("Recipe deleted");
})
.catch(err => {
  console.log("error deleting recipe");
});

mongoose.disconnect()
.then(res => {
  console.log("Disconnected! bye");
})
.catch(err => {
  console.log("error disconnecting");
});
