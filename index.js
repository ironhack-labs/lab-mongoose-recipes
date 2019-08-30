const mongoose = require('mongoose');
const recipeSchema = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const Recipe = mongoose.model('recipeApp', recipeSchema);

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



function createSpicyquesadillas() {
  Recipe.create({
    title: "Spicy Quesadillas",
    level: "Easy Peasy",
    ingredients: ['wraps', 'cheese', 'cayenne pepper'],
    cuisine: 'Mexican',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/images/75131.jpg.',
    duration: 5,
    creator: "El Coyote"
  }).then(recipe => { console.log('The title of the recipe is', recipe.title) }).
    catch(err => { console.log('An error occured:', err) });
}

function insertManyRecipes(recipes) {
  Recipe.insertMany(data).
    then(
      data.forEach((recipe) => console.log('Recipe title', recipe.title))).
    catch(err => { console.log('An error occured:', err) });
}

function updateDuration(titleOfRecipe, duration) {
  Recipe.updateOne({ title: titleOfRecipe }, { duration: duration }).
    then(console.log(titleOfRecipe, ' was successfully updated!'))
    .catch(err => { console.log('An error occurred', err) })
}

function removeRecipe(titleOfRecipe) {
  Recipe.deleteOne({ title: titleOfRecipe }).
    then(console.log(titleOfRecipe, ' has been succesfully removed')).
    catch(err => { console.log('An error occurred:', err) })
}

process.on('SIGINT', () => {
  mongoose.connection.close(console.log("Connection to the db has been closed"))
})

Recipe.deleteMany({}).then(() => {
  createSpicyquesadillas()
  insertManyRecipes(data)
  updateDuration('Rigatoni alla Genovese', 100)
  removeRecipe('Carrot Cake')
})

