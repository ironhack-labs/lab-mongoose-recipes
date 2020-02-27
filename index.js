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

  //iteration 2

  .then(() => {
    Recipe.create(data[0])
    .then((NewRecipe => console.log("created", NewRecipe)))
  })

  //iteration 3

  .then(() => {
    Recipe.insertMany(data.slice(1))
    .then((NewRecipe => console.log("inserted", NewRecipe)))
  })


 //iteration 4

  .then(() => {
    Recipe.updateOne(
      {title: "Rigatoni alla Genovese"},
      {duration: 100}
    .then((NewRecipe => console.log("updated", NewRecipe)
    )))})

    //iteration 5

    .then(() => {
      Recipe.deleteOne(
        {title: "Carrot Cake"})
      .then((NewRecipe => console.log("deleted", NewRecipe)

      ))})

      .catch(err => {
        console.error('Error', err)
      })
      .finally(() => {
        mongoose.connection.close();
        console.log('Closed')

      });
