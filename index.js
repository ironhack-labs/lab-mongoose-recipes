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

  .then(x => {

    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    return Recipe.deleteMany()
  })
  .catch(err => console.error('Error connecting to mongo', err))

  .then(() => {
    return Recipe.create({
      title: `Fritata`,
      ingredients: ['Patatas fritas', 'Ketchup'],
      cuisine: `Barrio`

    })
  })
  .then(x => {
    console.log(x.title)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((recipesCreated) => recipesCreated.forEach(x => console.log(x.title)))
  .then(() => {
    return Recipe.updateOne({
      title: 'Rigatoni alla Genovese'
    }, {
      duration: 100
    })
  })
  .then(() => {
    return Recipe.deleteOne({
      title: 'Carrot Cake'
    })
  })
  .then(() => {
    return mongoose.connection.close()
  })






// let newRecipe = Data.create()

// console.log(newRecipe)