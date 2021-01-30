require('dotenv').config()
require("./config/db.config")
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

//ITERATION 2
Recipe.create({
  title: "Lasaña",
  level: "Easy Peasy",
  ingredients: [
    "750 g of minced meat (pork and beef)",
    "24 plates of cannelloni or 12 of lasagna",
    "350 g of homemade tomato sauce",
    "200 ml of white wine (1 glass)",
    "1 onion",
    "200 g of sliced cheese",
    "100 g of grated cheese for gratin",
    "Salt, pepper, olive oil",
    "Bechamel sauce"
  ],
  cuisine: "Italian",
  dishType: "main_course",
  image: "https://www.annarecetasfaciles.com/files/lasana-de-carne-2-1.jpg",
  duration: 55,
  creator: "Eduardo García",
  created : "2021-01-30"
})
.then((u) => console.log(u))
.catch((e) => console.log("Error save Recipe", e))


//ITERATION 3

Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach((recipe) => {
      console.log(`New recipe added: ${recipe.title}`)
    })
})
.catch((e) => console.log("Error save Recipe", e))

//ITERARION 4

Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, {duration: '100'})
  .then((u) => console.log(u))
  .catch((e) => console.log("Error update", e))

//ITERATION 5

Recipe.deleteOne({ title: 'Carrot Cake'})
  .then((u) => console.log(u))
  .catch((e) => console.log("Error delete", e))