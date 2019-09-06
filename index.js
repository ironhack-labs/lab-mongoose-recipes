const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;
document.write(today);

// Recipe Creation
const recipe = {
  title: 'Cereal',
  level: 'Easy Peasy',
  ingredients: ['milk', 'cereal'],
  cuisine: 'Mexa',
  dishType: 'Breakfast',
  duration: '3',
  creator: 'Elías Rivas Fdz',
  created: document.write(today)
}
// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(async () => {
    console.log('Connected to Mongo!');

    const recipe = await Recipe.create(receta)
    console.log(recipe.title)

    // En vez de Model.insertMany
    const allRecipe = await Recipe.create(data)
    allRecipe.forEach(current => console.log(current.title))
    // Update Recipe
    await Recipe.findOneAndUpdate({
      title: 'Rigatoni alla Genovese'
    }, {
      duration: 100
    })
    console.log('Recipe updated')
    // Delete Recipe
    await Recipe.findOneAndDelete({
      title: 'Carrot Cake'
    })
    console.log('Recipe deleted')
    // Close Mongoose
    mongoose.connections.close()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });