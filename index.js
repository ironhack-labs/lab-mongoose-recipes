const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {  
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// ITERATION 2

Recipe.create({
  title: 'Chicken Recipe',
  level: 'Easy Peasy',
  ingredients: ['2 tsp garlic powder', '1 1/2 tsp onion powder', '2 tsp paprika OR smoked paprika', '2 tsp dried oregano', '1 1/2 tsp black pepper', '1 tsp kosher salt', '3 lbs. boneless skinless chicken thighs', '1 tbsp olive oil'],
  cuisine: 'Asian',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 25,
  creator: 'Mary Younkin'
})
  .then(Recipe => console.log(`The title of this recipe is: ${Recipe.title}`))
  .catch(error => console.log('Error'));

// ITERATION 3

Recipe.insertMany(data)
  .then(Recipe => console.log(`The title of this recipe is: ${Recipe.title}`, Recipe))
  .catch(error => console.log('Error'));

// ITERATION 4

Recipe.findByIdAndUpdate('5e2c6388e184ef11ded8aeed', {
  $set: { duration: 100 }
})
  .then(updatedRecipe => console.log('Updated recipe: ', updatedRecipe))
  .catch(err => console.log('Error while updating Recipe: ', err));

// ITERATION 5

Recipe.findByIdAndDelete('5e2c6388e184ef11ded8aeec')
  .then(deletedRecipe => console.log(`Deleted recipe with id: ${deletedRecipe._id}`))
  .catch(err => console.log('Error while deleting one recipe: ', err));


