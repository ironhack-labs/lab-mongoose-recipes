const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

const newRecipe = {
  title: "hard boiled eggs",
  level: "Easy Peasy",
  ingredients: ["water", "eggs"],
  cuisine: "World cuisine",
  dishtype: "Breakfast",
  image: "https://media.self.com/photos/5a2972874669415cf908f949/4:3/w_728,c_limit/0517-hard-boiled-egg-toast.jpg",
  duration: 8,
  creator: "ladul",
  created: 2019 - 11 - 09
}

// console.log(newRecipe) // no supe como hacer console.log the "title" desde aqui

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to Mongo!');

    //Iteration 2 - Create a recipe
    const recipe = await Recipe.create(newRecipe)
    console.log(`My best recipe ever: ${recipe.title}`)

    // Iteration 3 - Insert Many recipes
    const recipesArray = await Recipe.create(data)
    recipesArray.forEach(e => {
      console.log(`Recipe: ${e.title}`)
    })

    // Iteration 4 - Update recipe
    await Recipe.findOneAndUpdate({
      title: 'Rigatoni alla Genovese'
    }, {
        duration: 100
      })
    console.log(`Successful update!`)

    // Iteration 5 - Remove a recipe
    await Recipe.findOneAndDelete({
      title: 'Carrot Cake'
    })
    console.log(`No more carrot cake, pls`)

    // Iteration 6 - Close the Database
    mongoose.connection.close()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });