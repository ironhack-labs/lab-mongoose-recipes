const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'


// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })

Recipe.collection.drop()

Recipe.create({ title: 'salad', cuisine: 'French' })
  .then(() => console.log('Connected to Mongo!'))
  .then(x => Recipe.insertMany(data))
  .then(() => {
    data.forEach(elm => console.log(`The recipe titles are ${elm.title}`))
  })
  .then(x => Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }))
  .then(Recipe => console.log(`Recipe Updated`))
  .catch(err => `Error updating recipe: ${err}`)
  .then(x => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then(Recipe => console.log(`Recipe deleted`))
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })


mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));
process.on('SIGINT', () => { mongoose.connection.close(() => { console.log('Mongoose default connection disconnected through app termination'); process.exit(0); }); });
