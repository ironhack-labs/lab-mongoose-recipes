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
    // Recipe.create(title: 'quesadillas con queso(llevan queso todas)', cuisine: 'Chilanga')
    //   .then((newRecipe) => console.log(newRecipe)
    //   .catch((err) => console.log(err))

    Recipe.insertMany(data)
      .then(() => console.log('Data added'))
      .catch((err) => console.log(err))

    Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } })
      .then(() => console.log('updated'))
      .catch((err) => console.log(err))

    Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(() => console.log('title cleansed'))
      .catch(() => console.log(err))
  })
  // mongoose.connection.close()
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
