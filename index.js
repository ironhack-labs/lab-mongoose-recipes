const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

const tacosDorados = {
  title: 'Tacos Dorados',
  level: 'Easy Peasy',
  ingredientes: ['tortilla', 'aceite', 'salsa', 'agucate', 'pollo',],
  cuisine: 'mexicana',
  dishType: 'Dish',
  creator: 'Adrian Acevedo',
  }

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(

    Recipe.create(tacosDorados).then(tacosDorados => console.log(tacosDorados))
    .catch(err => console.log(err)),

    Recipe.insertMany(data).then((recipes) => {recipes.forEach(recipe => console.log(recipe.title))}),

    Recipe.updateOne({name: 'Rigatoni alla Genoverse'}, {duration: 100}). then(() => console.log('Duration updated')).catch((error) => console.log(error)),

    Recipe.deleteOne({name: "Carrot Cake"}).then(() => console.log("Cake Deleted")))

  .catch(err => console.error('Error connecting to mongo', err))

  mongoose.connection.close()

