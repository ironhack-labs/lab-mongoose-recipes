const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
  title: 'Macarrones con tomate',
  level: 'Easy Peasy',
  ingredients: ['macarrones', 'tomate'],
  cuisine: 'italiana',
  dishType: 'Dish',
  image: 'https://www.rebanando.com/media/maxresdefault-jpg-19_crop.jpeg/rh/macarrones-con-salsa-de-tomate-natural-o-sofrito.jpg',
  duration: 10,
  creator: 'Marco Polo',
  created: new Date (1292,1,1)
}).then(recipeCreated => {
  console.log(recipeCreated.title)
  Recipe.insertMany(data)
  .then(recipesCreated => {
    recipesCreated.forEach(recipe => {
      console.log(recipe.title)
    })
    Recipe.updateOne({title: {$eq:'Rigatoni alla Genovese'}}, {duration: 100}, {new: true}).then(recipeUpdate => {
      console.log('The new duration has been modified')
      Recipe.deleteOne({title: 'Carrot Cake'}).then(recipeDeleted => {
        console.log(`The recipe has been removed`)
        mongoose.connection.close()
      })
      })
  })
})


