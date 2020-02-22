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
  .then(()=> {
    return Recipe.create(data[0])
  }) 
  .then((recipe) => {
    console.log("The recipe is saved and it's value is:", recipe.title)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((recipes) => {
    recipes.forEach( recipe => console.log(recipe.title));
  })
  .then(() => {
    Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration:"100"})
  })
  .then(() => {
    console.log("Duration updated")
  })
  .then(() => {
    Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    console.log("Carrot Cake removed")
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })
  .finally(() => {
    mongoose.connection.close();
  });

