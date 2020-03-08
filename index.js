const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost:27017/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

const jiaoziRecipe = {title:'Jiaozi',level:'Easy Peasy',cuisine:'Chinese food',dishType:'Dish',duration:30,creator:'boyuan',};

// Recipe.create(jiaoziRecipe)
//   .then(recipe => console.log('This is recipe is saved and its value is:',recipe.title))
//   .catch(error => console.log('An error happened when saving a recipe:',error));

// Recipe.insertMany(data)
//   .then(recipes => recipes.forEach(r => console.log(r.title)) )
//   .catch(error => console.log('An error happened while saving the recipes:',error) );

// Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: 100})
//   .then(recipe => console.log('Succeed in changing the duration')
//   .catch(error => console.log('An error happened when change the duation',error));

Recipe.deleteOne({title: 'Carrot Cake'})
  .then(recipe => console.log('delte the recipe:',recipe))
  .catch(error => console.log('An error happened when delete'));

//stop the mongodb service by type the sudo service mongodb stop
