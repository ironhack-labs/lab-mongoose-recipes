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
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    Recipe
      .create({
        title: "Fried eggs", 
        level: "Easy Peasy", 
        ingredients: ["Eggs", "Olive oil", "Salt"],
        cuisine: "International", 
        dishType: "main_course", 
        image: "https://images.media-allrecipes.com/images/75131.jpg", 
        duration: 5, 
        creator: "Chef Sara", 
        reated: "default" 
      })
      .then(newRecipe => console.log('The recipe is already created, title:', newRecipe.title))
      .catch(error=> console.log('The recipe has not been created:', error))
      

    Recipe
        .insertMany(data)
        .then(allRecipes => {
          allRecipes.forEach(allRecipes => console.log('All the recipes has been created title:', allRecipes.title))
        })
        .catch(error=> console.log('The recipes have not been created:', error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



