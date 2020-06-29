const mongoose = require('mongoose')

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

const myRecipe = {
  title: 'Rissotto Funghi',
  level: 'Easy Peasy',
  ingredients: ['1 cup of rice', '300grs Funghi', '1 Onion', 'White wine'],
  cuisine: 'Italian',
  dishType: 'main_course',
  duration: 30,
  creator: 'Andrés Martínez'
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase()
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(myRecipe)
      //Iteration 2 - Create a recipe
      .then((recipe) => console.log(`The ${recipe.title} recipe was created`))
      //Iteration 3 - Insert multiple recipes
      .then(() => Recipe.insertMany(data))
      .then(() => {
        data.forEach((el) => console.log(`The ${el.title} recipe was added`))
      })
      //Iteration 4 - Update recipe
      .then(() =>
        Recipe.findOneAndUpdate(
          { title: 'Rigatoni alla Genovese' },
          { duration: 100 }
        )
      )
      .then((recipe) => console.log(`The ${recipe.title} recipe was updated`))
      //Iteration 5 - Remove a recipe
      .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
      .then((recipe) => console.log(`The ${recipe.title} recipe was deleted`))
      //Iteration 6 - Close the Database
      .then(() => {
        mongoose.connection.close()
        console.log('Database closed.')
        process.exit(0)
      })

      .catch((error) => console.log('An error ocurred', error))
  })

  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
