const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// recipe for iteration #2
const recipeIter2 = {
  title: "Iron Schema",
  level: "Easy Peasy",
  cuisine: "express",
  creator: "Kevin"
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Iteration #2
    Recipe.create(recipeIter2)
      .then(recipe => {
        console.log(recipe.title);
        console.log("<---------------------------->\n");
      })
      .catch(err => console.log(err));

    // Iteration #3
    Recipe.insertMany(data)
      .then(() =>{
        Recipe.find({}, {_id:0, title:1})
          .then(recipesFromDB => {
            recipesFromDB.forEach(ele => console.log(ele.title) );
            console.log("<---------------------------->\n");
          })
      }).then(() => {
        // Iteration #4
        Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
          .then(updatedRecipe => {
            console.log(`${updatedRecipe.title} recipe has been updated`);
            console.log("<---------------------------->\n");
          })
      })

    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
