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
  title: 'Tortilla de patata',
  level: 'UltraPro Chef',
  ingredients: ['Huevos', 'Patata', "cebolla", "aceite"],
  cuisine: 'Española',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'La Paca'
})
  .then(
    Recipe.insertMany(data)
      .then(recipes => recipes.forEach(recipe => {
        console.log(recipe.title)
      }))
      .catch(err => console.log(err))
  )
    .then(
      Recipe.findByIdAndUpdate("5dd5ef062e8ec1482e4a0391", {duration: 100})
        .then(() => console.log("The recipe was successfully updated!"))
        .catch(err => console.error(err))
    )
      .then(
        Recipe.deleteOne({title: "Carrot Cake"})
          .then(() => console.log("The recipe was successfully removed"))
          .catch(err => console.error(err))
      )


process.on('SIGINT', () => {
  mongoose.connection.close( () => {
    console.log('Mongoose disconnected');
    process.exit(0);
  });
});