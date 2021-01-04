const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({title: 'Nachos', ingredients: ['tortilla chips', 'ground beef', 'lettuce', 'tomato', 'cheese', 'sour cream'], cuisine: 'Mexican'
    })
    .then(newRecipe => console.log(`The recipe for ${newRecipe.title} has been added to the database.`))
    .catch(error => console.log(`${newRecipe.title} could not be added to the database`, error));

    Recipe.insertMany(data)
    .then(recipeData => recipeData.forEach(recipe => console.log(`The recipe for ${recipe.title} has been added to the database`)))
    .catch(error => console.log(`There was an error adding the recipes to the database`, error));

    Recipe.updateOne({title:"Rigatoni alla Genovese"}, {duration: 100}) 
    .then(() => console.log(`The requested recipe has been successfully updated with a new duration.`))

    .catch(error => console.log(`There was an error updating the recipe`, error))

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

})
