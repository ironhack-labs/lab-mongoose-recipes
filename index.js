const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to Mongo!');
    try {
      const recipeCreated = await Recipe.create({
        title: 'Ice',
        level: 'UltraPro Chef',
        cuisine: 'French',
        ingredients: ['water'],
        dishType: 'Snack',
        duration: 12,
        creator: 'Daniel'
      });
      console.log('From index.js', recipeCreated);

      const recipesCreated = await Recipe.create(data);
      console.log('From data.js');

      recipesCreated.forEach(recipe => console.log(recipe.title));

      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { duration: 100 },
        { new: true }
      );
      console.log('Updated', updatedRecipe);

      const deletedRecipe = await Recipe.findOneAndDelete({ title: 'Carrot Cake' });
      console.log('Succefully deleted', deletedRecipe);

      mongoose.connection.close();
    } catch (e) {
      console.log(e);
      mongoose.connection.close();
    }
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });
