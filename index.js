const mongoose = require('mongoose')
const Recipe = require('./models/Recipe') // Import of the model Recipe from './models/Recipe'
const data = require('./data.js') // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })

Recipe.create({
  title: 'Albondigas caseras',
  level: 'UltraPro Chef',
  ingredients: ['carne picada', 'cebolla', 'ajo', 'tomate'],
  cuisine: 'American',
  dishType: 'Dish',
  duration: 45,
  creator: 'Alguna abuela'
})
  .then(x => Recipe.insertMany(data))
  .then(x => Recipe.updateMany({ title: 'Rigatoni alla Genovese' }, { duration: 100 }))
  .then(x => Recipe.deleteMany({ title: 'Carrot Cake' }))
  .catch(err => console.log('ERROR', err))

// .then(() =>
//   Recipe.insertMany(data)
//     .then(() =>
//       Recipe.updateMany({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
//         .then(Recipe.deleteMany({ title: 'Carrot Cake' }).catch(err => console.log(err)))
//         .catch(err => console.log('ERROR', err))
//     )
//     .catch(err => console.log('ERROR', err))
// )

// Recipe.insertMany(data)
//   .then(elm => console.log('Hemos insetado estos elementos', elm))
//   .catch(err => console.log('ERROR', err))

// Recipe.updateMany({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
//   .then(elm => console.log('We did update', elm))
//   .catch(err => console.log('The was an error updating:', err))
// Recipe.deleteMany({ title: 'Carrot Cake' })
//   .then(elm => console.log('Hemos borrado:', elm))
//   .catch(err => console.log('Error al borrar:', err))
