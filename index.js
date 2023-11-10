const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const garlicSoupRecipe = {
      title: 'Simple Garlic Soup',
      level: 'Easy Peasy',
      ingredients: [
        '6 cloves garlic, minced',
        '2 tablespoons olive oil',
        '6 cups chicken or vegetable broth',
        '1 teaspoon dried thyme',
        'Salt and pepper to taste',
        'Croutons for garnish (optional)',
        'Fresh parsley for garnish (optional)',
      ],
      cuisine: 'International',
      dishType: 'soup',
      image: 'https://example.com/garlic_soup.jpg',
      duration: 30,
      creator: 'Chef Jane',
    };

    return Recipe.create(garlicSoupRecipe);
  })
  .then((createdRecipe) => {
    console.log(`Recipe created: ${createdRecipe.title}`);
    
    return Recipe.insertMany(data);
  })
  .then((insertedRecipes) => {
    insertedRecipes.forEach((recipe) => {
      console.log(`Recipe: ${recipe.title}`);
    });

    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true } 
    );
  })
  .then((updatedRecipe) => {
    console.log(`Updated duration of Rigatoni alla Genovese to ${updatedRecipe.duration} minutes`);

    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Carrot Cake recipe removed');

    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
