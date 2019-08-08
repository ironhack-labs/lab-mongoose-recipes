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


// TODO Iteration 2: Create info to create new recipie
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
  .then(console.log(`Added the list of new recipes!`))
  .catch((err) => {console.log(`Sorry chef, there was an error adding the list of recipies`);})