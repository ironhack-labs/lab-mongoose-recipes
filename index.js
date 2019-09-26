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

  Recipe.create({title: `Lasanha`, level: `UltraPro Chef`, ingredients: [`Massa`, `Molho`, `Queijo`, `Carne`, `Presunto`], cuisine:`Italiana`, dishType: `Dish`, image:`http://www.receitasnestle.com.br/images/default-source/recipes/lasanha_a_bolonhesa_saborosa.jpg`, duration: 30, creator:`Filipe`})
    .then(Recipe => {console.log(Recipe.title)})
    .catch(err => {console.log(error)})

Recipe.insertMany(data)
  .then(data => {
    data.forEach((elem) => console.log(elem.title))
  })
  .catch(error => {console.log(error)})

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(recipe => console.log("update sucess!"))
  .catch(error => console.log(error))

Recipe.deleteOne({title: "Carrot Cake"})
  .then(recipe => console.log("delete sucess!"))
  .catch(error => console.log(error))

mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination');
  process.exit(0);
});