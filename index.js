const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true})
  .then(async () => {
    console.log('Connected to Mongo!');
    try {
      const myBarbacoa = await Recipe.create({
        title: 'Barbacoa',
        level: 'UltraPro Chef',
        cuisine: 'Mexican Hidalguense alv Perroooo',
        ingredients: ['Borrego', 'Pencas de maguey'],
        dishType: 'Dish',
        image: 'https://www.entornoturistico.com/wp-content/uploads/2017/08/Barbacoa-al-estilo-Hidalgo-660x330.jpghttps://www.entornoturistico.com/wp-content/uploads/2017/08/Barbacoa-al-estilo-Hidalgo-660x330.jpg',
        duration: 6000,
        creator: 'Xavier Martinez'
      });
      console.log(myBarbacoa);

      const recipesCreated = await Recipe.create(data);
      console.log(`All the menu:
      ${recipesCreated}`);

      recipesCreated.forEach(recipe => console.log(recipe.title));

      const updatedRecipe = await Recipe.findOneAndUpdate({
        title: 'Rigatoni alla Genovese'
      }, {
        duration: 100
      }, {
        new: true
      });
      console.log(`Rigatoni Updated:
      ${updatedRecipe}`);

      const deletedRecipe = await Recipe.findOneAndDelete({
        title: 'Carrot Cake'
      });
      console.log('Succefully deleted', deletedRecipe);

      mongoose.connection.close();
    } catch (e) {
      console.log(e);
      mongoose.connection.close();
    }
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });