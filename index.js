const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


const myRecipe = { 
  title: 'Patatas a lo Pobre', 
  level: 'Easy Peasy', 
  ingredients: 'potatoes', 
  cuisine: 'Spanish', 
  dishType: 'Dish', 
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg', 
  duration: 40, 
  creator: 'Chef Pablo' 
};

Recipe.create(myRecipe)
.then(myRecipe => console.log('The name of the recipe is:', myRecipe.title))
.catch(error =>
    console.log('An error happened while adding a recipe:', error)
);

Recipe.insertMany(data)
  .then(data.forEach(recipe => console.log('The title of the recipe is:', recipe.title)))
  .catch(error =>
    console.log('An error happened while adding a recipe:', error)
); 