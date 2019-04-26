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

//Created my own recipe.
Recipe.create({
  title: "CK's Pasta",
  level: "Easy Peasy",
  ingredients: ["Pasta", "Sauce", "Love"],
  cuisine: "Italian",
  dishType: "Dish",
  image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/1/07/0/JE401_Giadas-Pasta-with-Creamy-White-Beans_s4x3.jpg.rend.hgtvcom.826.620.suffix/1546886427856.jpeg",
  duration: 20,
  creator: "CK",
}, function (err, recipe) {
  if (err) {
    console.log('An error happened:', err);
  } else {
    console.log('The recipe is saved and its value is: ', recipe);
  }
});

//Inserts all the recipes
Recipe.insertMany(data)


Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(console.log("Sucess"))
  .catch(console.log("Not Sucess"));


Recipe.deleteOne({ title: "Carrot Cake" })
  .then(console.log("Sucess"))
  .catch(console.log("Not Sucess"));


//Disconnects 
setTimeout(() => {
  mongoose.disconnect();
}, 1500)