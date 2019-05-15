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

/* const addNewRecipe = (titleRecipe, levelRecipe, ingrRecipe, cuisineRecipe, dishRecipe, imageRecipe, durationRecipe, creatorRecipe, createdRecipe) => {

  const recipe = new Recipe({ title: titleRecipe, level: levelRecipe, ingredients: ingrRecipe, cuisine: cuisineRecipe, dishType: dishRecipe, image: imageRecipe, duration: durationRecipe, creator: creatorRecipe, created: createdRecipe })

  recipe.save()
    .then(title => console.log('receta guardada', title))
    .catch(err => console.log('Error', err))
} */




Recipe.create({
  title: "Tortilla de patatas Mejorada", level: "Easy Peasy", ingredients: ["huevos", "patatas", "aceite", "sal"], cuisine: "mediterranea", dishType: "Dish", image: undefined, duration: 60, creator: "Cris y Lu", created: undefined
})
  .then(recipe => { console.log(recipe.title) })
  .catch(err => { console.log('An error happened:', err) });


const manyRecipes = () => {
  Recipe.insertMany(data)
    .then((recipes) => recipes.forEach(batman => console.log(batman.title)))
    .catch(err => { console.log("An error happened", err) })

}


//manyRecipes()
