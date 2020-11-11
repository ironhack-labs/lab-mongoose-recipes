const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = {
  "title": "Carbonara",
  "level": "Amateur Chef",
  "ingredients": [
    "300 grs Pasta",
    "200 grs Bacon",
    "Salt and Pepper",
    "Egg",
  ],
  "cuisine": "Italian",
  "dishType": "main_course",
  "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  "duration": 40,
  "creator": "Chef Dreyan"
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  
    // Iteration 1 & Iteration 2 - insert schema & create a recipe
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(newRecipe)
      .then(recipe => { console.log("This is the recipe title:", recipe.title) })
  })

    // Iteration 3 - insert multiple recipes
  .then(() => {
    return Recipe.insertMany(data)
      .then(allRecipes => {
        allRecipes.forEach(element => console.log("This are the recipes' titles", element.title))
      })
  })

    // Iteration 4 - update recipe
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: "100" }, {new: true})
      .then((newDuration) => console.log("Time duration has been changed to:", newDuration.duration))
  })
    
    // Iteration 5 - remove a recipe
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log("Carrot Cake is no longer"))
  })

    // Iteration 6 - close the database
  .then(() => {
    return mongoose.connection.close(() => {
      console.log("The database has been closed")
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });



