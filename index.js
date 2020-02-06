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

//creating a recipe
let recipe1 = {
  title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
}

Recipe.create(recipe1)
  .then(result => {
    console.log("New recipe", result.title);
    
  })
  .catch(err => {
    console.log(err);
    
  });

  //insert multiple recipes
Recipe.insertMany(data)
  .then(result => {
    console.log("New recipes", result.length);
    
  })
  .catch(err => {
    console.log(err);
    
  }) 

  //update recipe
  Recipe.findOneAndUpdate(
    {title: 'Rigatoni alla Genovese'}, 
    { $set: {duration: 100}},
    {new: true} //every time that you return an object it updates it as well
    )
    .then(result => 
      console.log('Recipe successfuly updated', result))
    .catch(err => 
      console.log(err))

  //remove recipe 
  Recipe.deleteOne({title: 'Carrot Cake'})
    .then((result) =>
      console.log('Recipe successfuly deleted', result.deletedCount))
    .catch(err =>
      console.log(err));