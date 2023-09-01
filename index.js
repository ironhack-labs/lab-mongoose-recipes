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
    // Run your code here, after you have insured that the connection was made
    const newRecipe = {
      title: 'Delicious Pancakes',
      level: 'Easy Peasy',
      ingredients: ['flour', 'milk', 'eggs', 'sugar', 'baking powder'],
      cuisine: 'Breakfast',
      dishType: 'breakfast',
      image: 'https://example.com/pancakes.jpg',
      duration: 20,
      creator: 'John Doe'
    };

    return Recipe.create(newRecipe);
  })

  .then(createdRecipe => {
    console.log(`Added recipe: ${createdRecipe.title}`);
    return Recipe.insertMany(data);
  })

  .then(insertedRecipes => {
    insertedRecipes.forEach(recipe => {
      console.log(`Inserted recipe: ${recipe.title}`);
    });

    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    );
  })
  .then(updatedRecipe => {
    console.log(`Updated duration of recipe: ${updatedRecipe.title}`);

    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Removed "Carrot Cake" recipe');
    
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed.');
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
    mongoose.connection.close();
  });
