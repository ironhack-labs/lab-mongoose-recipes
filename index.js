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

  const unaiRecipe =  {
    title: 'Pepperoni Pizza',
    level: 'Easy Peasy',
    ingredients: ['Pizza dough', " Tomato sauce", 'onion', 'pepperoni', 'mozzarella'],
    cuisine: 'Italian',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/userphotos/600x600/7626533.jpg',
    duration: 15,
    creator: 'Unai Gonzalez'
  }


 Recipe
  .create(unaiRecipe)
  .then(recipe => console.log('The recipe is saved and its value is: ', recipe))
  .catch(error =>
    console.log('An error happened while saving a new recipe:', error)
  );

  Recipe
  .insertMany(data)
  .then(recipe => console.log('The recipes are saved and their values are: ', recipe))
  .catch(error => 
    console.log('An error happened while saving new recipes:', error))

   
  Recipe
  .updateOne({title: 'Rigatoni alla Genovese'}, {duration :100})
  .then(console.log('recipe changed successfully'))
  .catch((error => {console.log(`and ${error} was found`)}));
  
  Recipe
  .deleteOne({title:'Carrot Cake'})
  .then(console.log('Recipe deleted successfully'));
  
   mongoose
  .disconnect(() => console.log('disconnected succesfully'))