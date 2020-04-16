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
    //Run your code here, after you have insured that the connection was made
    //Iteracion 2
    Recipe.create(data[0])
      .then((newRecipe) => {
        console.log(newRecipe)
        mongoose.disconnect()
      })
      .catch((err) => console.log(err))

    //Iteracion 3
    Recipe.insertMany(data)
      .then((newRecipe) => {
        console.log(newRecipe)
        mongoose.disconnect()
      })
      .catch((err) => console.log(err))

    //Iteracion 4
    Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } })
      .then((newRecipe) => console.log(newRecipe))
      .catch((err) => console.log(err))

    //Iteracion 5
    Recipe.deleteOne({ title: 'Carrot Cake' })
      .then((newRecipe) => console.log(newRecipe))
      .catch((err) => console.log(err))
  })

  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
