const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });





Recipe.create({
  title: "Chicken Dynamite",
  level: "Easy Peasy",
  ingredients: ["lemon"],
  cuisine: "Libanesa",
  dishType: "Dish",
  duration: 60,
  creator: "Edie"
})
  .then(recipeCreated => Recipe.insertMany(data))
  .then(dataAdded => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, {
    duration: 100
  })
    .then(updatedRecipe => {
      console.log('Successfully updated recipe!'),
        Recipe.deleteOne({ title: 'Carrot Cake' })
          .then(deletedRecipe => {
            console.log('Successfully deleted recipe!'),
              mongoose.connection.close();
          })
    }));
