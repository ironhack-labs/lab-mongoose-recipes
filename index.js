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

const newRecipe = {
  title: "Chicken Dynamite",
  level: "Easy Peasy",
  ingredients: ["400grs chickpeas", "garlic", "lemon"],
  cuisine: "Libanesa",
  dishType: "Dish",
  duration: 60,
  creator: "Edie"
}
let recipeCreated = Recipe.create(newRecipe)
.then(recipe => {
  console.log(recipe)
})
.catch(err => {
  console.log(err)
})
let recipeUpdated = Recipe.findOneAndUpdate(
  {
    title: "Rigatoni alla Genovese"
  },
  {
    new: true 
  }
)
  .then(recipe => {
    console.log(err)
  })

  let recipeDelete = Recipe.deleteOne({
    title: "Carrot Cake"
  })
    .then(cake => {
      console.log(`${cake} Not available anymore`)
    })
    .catch(err => {
      console.log(err)
    })
