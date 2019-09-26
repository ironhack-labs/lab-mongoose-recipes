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

const myRecipe = new Recipe({
  title: 'Carrot Cake2',
  level: 'Amateur Chef',
  ingredients: ['6 cups grated carrots', '1 cup brown sugar', '1 cup raisins', '4 eggs', '1 1/2 cups white sugar', '1 cup vegetable oil', '2 teaspoons vanilla extract', '1 cup crushed pineapple, drained', '3 cups all-purpose flour', '1 1/2 teaspoons baking soda', '1 teaspoon salt', '4 teaspoons ground cinnamon'],
  cuisine: 'International',
  dishType: 'Dessert',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
  duration: 130,
  creator: 'Adamy & Lucas'
})

const p1 = Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100});
const p2 = Recipe.deleteOne({title: 'Carrot Cake'});
const p3 = myRecipe.save();

Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => console.log(`Recipe created: ${recipe.title}`));
    
    Promise.all([p1, p2, p3])
      .then(result => {
        console.log(result);
        mongoose.connection.close();
      })
      .catch(err => {
        console.log(err)
        mongoose.connection.close(); 
      });
  })
  .catch(err => {
    console.log(`Error found: ${err}`);
    mongoose.connection.close(); 
  });



