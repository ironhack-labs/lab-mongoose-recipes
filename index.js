const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'


// Connection to the database "recipeApp"


mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))

Recipe.collection.drop()
  .then(x => Recipe.create({
    title: 'Luz´s Curry',
    level: 'UltraPro Chef',
    ingredients: ['Chicken', 'Curry', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
    cuisine: 'Asian',
    dishType: 'Dish',
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef Luz'
  }))
  .then(newRecipe => console.log(`La receta añadida es ${newRecipe.title}`))
  .then(x => Recipe.insertMany(data))
  .then(newRecipies => newRecipies.forEach(elm => console.log(`Se ha añadadido ${elm.title} en la base de datos`)))
  .then(x => Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }))
  .then(x => console.log(`La receta se ha modificado con éxito`))
  .then(x => Recipe.deleteOne({
    title: "Carrot Cake"
  }))
  .then(x => console.log("Se ha borrado la receta con éxito"))
  .catch(err => console.error('Error connecting to mongo', err))
  .then(() => {
    mongoose.connection.close()
    console.log("Se ha desconectado de la apllicacion")
  })
  .catch(err => mongoose.connection.close())
// .finally(() => mongoose.disconnect())