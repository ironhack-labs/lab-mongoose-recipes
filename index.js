const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`)
    return self.connection.dropDatabase()
  })
  .then(() => {
    //iteration 2
    Recipe.create(data[1])
      .then((newRecipe) => console.log(newRecipe))
      .catch((err) => console.log(err))
    //iteration 3
    Recipe.insertMany(data)
      .then((newRecipe) => {
        console.log(newRecipe)
        //iteration4
        Recipe.updateOne({title: 'Rigatoni alla Genovese',}, {duration: 100,})
        .then((recipe) => console.log(newRecipe))
        //iteration5
        Recipe.deleteOne({
          title: 'Carrot Cake',
        }).then((recipe) => console.log(`The ${recipe} was deleted`))
      })
      .catch((err) => console.log(err))
  })
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
