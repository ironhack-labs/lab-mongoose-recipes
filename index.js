const mongoose = require('mongoose');
const MONGODB_URI = "mongodb://127.0.0.1:27017";
const DATABASE_NAME = "example"

const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    
    
    // createRecipe();
    // createManyRecipes();
    // updateRecipe();
    deleteRecipe() 
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  // Create recipe

  function createRecipe () {
    Recipe.create ({
      title: "Chocolate Chip Extra Cookies",
      level: 'Amateur Chef',
      ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '5 cups semisweet chocolate chips'],
      cuisine: 'French',
      dishType: 'Dish',
      image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 30,
      creator: 'Chef Jennifer'
    })
 
    .then(recipe => {
      console.log(`Create the ${recipe.title} recipe`)
    })

    .catch(error => {
      console.log("Recipe creation failure")
    })
  }

  function createManyRecipes() {
    Recipe.insertMany(data)
      .then(recipes => {
        for (item of recipes) console.log(`Created the ${item.title} recipe!`);
      })
      .catch(error => {
        console.log('Failure loading data base.')
      })
   }


   function updateRecipe() {
    Recipe.find({title: 'Rigatoni alla Genovese'})
    .then(recipe => {
      recipe[0].duration = 100;
      recipe[0].save()
        .then(() => {
          console.log('Update susseccfull!');
        })
        .catch(error => {
          console.log('Update failure.');
        })
    })
    .catch(error => {
      console.log('Error retrieving the recipe.', error);
    })

    function deleteRecipe() {
      Recipe.deleteOne ({title: "Carrot Cake"})
      .then(() => {
        console.log("Recipe was removed")
      }) 
}
     
   }