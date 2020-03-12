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

//ITERATION 2
Recipe
.create({
    title: 'Carbonara',
    level: 'Amateur Chef',
    ingredients: [
      '1/2 cup oyster vinegar',
      '5 tablespoons cream',
      '1/3 cup bacon',
      '1/4 cup Asian rice',
      '3 tablespoons Asian chili garlic sauce',
      '3 tablespoons black pepper',
      'salt to taste',
    ],
    cuisine: 'Italian',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 15,
    creator: 'Chef Sundgren',
  })
  .then(recipe => {
    console.log('Recipe created!');
  })
  .catch(err => {
    console.log(err);
  });

//ITERATION 3
Recipe
    .insertMany(data)
    .then(recipe =>{
      recipe.forEach(titleRecipe => 
        console.log('Recipes inserted', titleRecipe.title));
    })
    .catch(err =>{
      console.log(err);
    })


    //ITERATION 4
Recipe
  .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(recipe => {
    console.log('Success message!');
  })
  .catch(err => {
    console.log(err);
  })


//ITERATION 5
Recipe
  .deleteOne({title: 'Carrot Cake'})
  .then(recipe =>{
    console.log('Remove success!');
  })
  .catch(err =>{
    console.log(err);
  })

//ITERATION 6
mongoose.connection.close(function(){
    console.log('Database is closed.');
  })
