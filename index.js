const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

mongoose.set('useFindAndModify', false)
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    // Iteration 2
    Recipe.create({ title: 'pizzas', cuisine: 'itali' }).then((newRecipe) => {
      console.log(newRecipe)
    })

    //iteration 3
    Recipe.insertMany(data).then(() => {
      data.forEach((el) => {
        console.log(el.title)
      })
      Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }).then(() => {
        console.log('Actualizado con exito!')
        Recipe.deleteOne({ title: 'Carrot Cake' }).then(() => {
          console.log('Borrado con Exito').then(() => mongoose.disconnect())
        })
      })
    })
  })

  //   //iteration 4
  // Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  //   .then(() => {
  //     console.log('Actualizado con exito!')
  // })

  //   //iteration 5
  // Recipe.deleteOne({ title: 'Carrot Cake' })
  //   .then(() => {
  //     console.log('Borrado con Exito')
  // })

  //iteration 6
  // .then(() => mongoose.disconnect())

  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
