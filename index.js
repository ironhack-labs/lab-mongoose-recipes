const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to Mongo!');
    try {
      const newRecipe= await Recipe.create({
        title: 'Agua',
        level: 'UltraPro Chef',
        cuisine: 'Italian',
        ingredients: ['hidrogeno', 'hidrogeno', 'oxigeno'],
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Waterdrops_%284648726722%29.jpg/220px-Waterdrops_%284648726722%29.jpg',
        dishType: 'Dessert',
        duration: 3,
        creator: 'Raul'
      });
      console.log('Created', newRecipe);

      const allRecipes = await Recipe.create(data);
      console.log('Recipes titles');

      allRecipes.forEach(recipe => console.log(recipe.title));

      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { duration: 100 },
        { new: true }
      );
      console.log('Updated', updatedRecipe);

      const deletedRecipe = await Recipe.findOneAndDelete({ title: 'Carrot Cake' });
      console.log('Deleted', deletedRecipe);

      mongoose.connection.close();
    } catch (e) {
      console.log(e);
      mongoose.connection.close();
    }
  })
  .catch(e => {
    console.error('Error connecting to mongo', e);
  });

