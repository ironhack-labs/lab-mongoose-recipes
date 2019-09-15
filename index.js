const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to Mongo!')
    try{
      const recipe = await Recipe.create({
      title: 'Arroz',
      level: 'Amateur Chef',
      ingredients: ['arroz', 'caldo de pollo', 'cebolla', 'ajo'],
      cuisine: 'mexicana',
      dishType: 'Dish',
      image: 'https://www.deliciosi.com/images/1000/1059/arroz-a-la-mexicana.jpg',
      duration: 20,
      creator: 'yo',
      })
      console.log('From index.js', recipe)

      const recipesCreated = await Recipe.create(data)
      console.log('From data.js')

      recipesCreated.forEach(recipe => console.log(recipe.title));

      const updateRecipe = await Recipe.findOneAndUpdate(
        { title: 'Rigatoni alla Genovese' },
        { duration: 100 },
        { new: true }
      );
      console.log('Updated', updateRecipe)

      const deleteRecipe = await Recipe.findOneAndDelete(
        { title: 'Carrot Cake' })
      console.log('Succefully deleted', deleteRecipe)

      mongoose.connection.close()
      } catch (e) {
        console.log(e)
        mongoose.connection.close()
      }
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

