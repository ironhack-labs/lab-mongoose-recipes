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
    Recipe.collection.drop()
  })
  .then(() => {
    const recipe1 = { title: 'Palomitas', level: 'Easy Peasy', ingredients: ['corn', 'butter', 'salt'], cuisine: 'International', dishType: 'Snack', duration: 10, creator: 'Chicote' }
    return Recipe.create(recipe1)
  })

  .then(theNewRecipe => console.log(`La nueva receta ${theNewRecipe.title} ha sido creada`, theNewRecipe))
  .then(x => Recipe.insertMany(data))
  .then(allNewRecipes => console.log('Las nuevas recetas han sido incluidas:', allNewRecipes))
  .then(x => Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }))
  .then(updateInfo => console.log('Se ha cambiado con éxito:', updateInfo))
  .then(x => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then(deleteInfo => console.log('Se ha eliminado con éxito:', deleteInfo))
  .then(x => mongoose.connection.close())
  .catch(error => console.log(`Se produjo un error ${error}`))



