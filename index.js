const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });


//ITERATION 2: Create a recipe
Recipe.create({
    title: 'Lemon Garlic Parmesean Shrimp Pasta',
    level: 'UltraPro Chef',
    ingredients: ['8 ounces Linguine Pasta',
      '2 Tablespoons olive oil',
      '6 Tablespoons butter',
      '4 cloves garlic minced',
      '1 teaspoon red pepper flakes',
      '1 1/4 pound large shrimp',
      'salt and pepper to taste',
      '1 teaspoon italian seasoning',
      '4 cups baby spinach',
      '1/2 cup parmesan cheese',
      '2 Tablespoons parsley chopped',
      '1 Tablespoon lemon juice'
    ],
    cuisine: 'Italian',
    dishType: 'Dish',
    image: 'https://therecipecritic.com/wp-content/uploads/2016/08/lemonbuttergarlicparmesanshrimppastacrop.jpg',
    duration: 40,
    creator: 'Chef Fils',
  })
  .then(Recipe => console.log(`Title of Recipe: ${Recipe.title}`))
  .catch(error =>
    console.log('Error', error)
  );


//ITERATION 3: Insert many recipes
Recipe.insertMany(data)
  .then(Recipe => console.log(`Title of Recipe: ${Recipe.title}`, Recipe))
  .catch(error => console.log('An error occured while saving your new recipe: ', error))


//ITERATION 4: Update recipe
Recipe.findByIdAndUpdate('5e2c6005af0b8705483814f2', {
    $set: {
      duration: 100
    }
  })
  .then(updatedRecipe => console.log('Updated Recipe: ', updatedRecipe))
  .catch(err => console.log('Error while updating the recipe: ', err));

//INTERATION 5: Remove a recipe
Recipe.findByIdAndDelete('5e2c6005af0b8705483814f1')
  .then(deletedRecipe => console.log(`Deleted recipe with id: ${deletedRecipe._id}`))
  .catch(err => console.log('Error while deleting one cat: ', err));