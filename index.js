const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const newRecipe = {
  title: 'Enchiladas',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
}

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    Recipe.create(data)
    Recipe.create(newRecipe)
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
// Connection to the database "recipeApp"
Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set: {duration: 100}})
.then(()=> {
  console.log('success!')
.catch(err => console.log(err))
})

Recipe.findOneAndDelete({title: 'Carrot Cake'})
.then(() => {
  console.log('Recipe deleted')
})
.catch(()=> {
  console.log(err)
})

mongoose.connections.close()
