const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

const myRecipe = {
  title: 'Ropa Vieja',
  level: 'UltraPro Chef',
  ingredients: ['Beef', 'Peppers', 'Beans', 'Colchones'],
  cuisine: 'Cuban',
  dishType: 'Dish',
  duration: 60,
  creator: 'Uschi Otze',
  created: '2017-05-13'
}


// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })

Recipe.create(myRecipe)
  .then(() => {
    console.log(`Connected to Mongo! Created recipe with title ${myRecipe.title}`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error connecting to Mongo', err)
    mongoose.connection.close()
  })

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => {
    console.log(`Updated recipe`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error connecting to Mongo', err)
    mongoose.connection.close()
  })


Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => {
    console.log(`Deleted recipe`)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error connecting to Mongo', err)
    mongoose.connection.close()
  })


