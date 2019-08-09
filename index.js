const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    // Delete all recipes in db before we start doing anything
    deleteAllRecipies()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// TODO Iteration 2: Create new recipe following schema
Recipe.create({

  title: 'Flurry Fluff',
  level: "Easy Peasy",
  ingredients: [`Flurry`, `fluff`, `love`, `Pint of Salt`],
  cuisine: `Lean`,
  dishType: `Snack`,
  image: '',
  duration: 20,
  creator: `Alex El Sweet`,
  created: ``

})
  .then((newRecipe) => { console.log(`New reicpie: ${newRecipe.title} added!`) })
  .catch((err) => { console.log(`Error adding new recipie: `, err) });

// TODO Iteration 3: Create multiple recipies, by adding from other file

Recipe.insertMany(data)
  .then((recipes) => { console.log(`Added the list of new recipes!`, recipes) })
  .catch((err) => { console.log(`Sorry chef, there was an error adding the list of recipies`, err); })

// TODO Iteration 4: Update duration of The Rigatoni alla Genovese 
// for the recipe found with name Rigatoni alla, chamge duration to 100
Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then((updatedDocument) => {
    console.log(`Successfully updated`, updatedDocument)
  })
  .catch((err) => { console.log(`Error updating document`, err); });

const deleteAllRecipies = () => {
  Recipe.deleteMany({ duration: { $gte: 18 } })
    .then(console.log(`Successfully deleted all documents`))
    .catch(err => console.log(`Error deleteing all documents`, err))
}
