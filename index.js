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
return Recipe.deleteMany()
  .catch(err => console.error('Error connecting to mongo', err))


  // Iteration 2

  .then(() => {
    let recipe1 = {
      title: 'Prueba',
      level: 'Easy Peasy',
      ingredients: '[cocacola, cafe]',
      cuisine: 'Spanish',
      dishType: 'Dish',
      image: '',
      duration: 20,
      creator: 'Luciano'
    }
    Recipe.create(recipe1)
      .then((recipeCreated => console.log("Recipe created successfully")))
      .catch(err => console.log(err))
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(() => {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection closed');
    });
  })