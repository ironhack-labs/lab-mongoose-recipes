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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())

  .then(() => {
    // ITERATION 2
    return Recipe.create({
      title: 'Espaguetis a la Carbonara',
      level: 'Easy Peasy',
      ingredients: ['Espaguetis', 'Cebolla', 'Bacon', 'Nata', 'Huevo', 'Sal'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 45,
    })
  })
  .then((newRecipe) =>
    console.log('The recipe you created is:', newRecipe.title)
  )
  // ITERATION 3
  .then(() => Recipe.create(data))
  .then((recipes) =>
    recipes.forEach((recipe) =>
      console.log("You've created the following new recipe: ", recipe.title)
    )
  )
  // ITERATION 4
  .then(() =>
    Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 }
    )
  )
  .then((recipe) =>
    console.log("Success! You've modified the recipe: ", recipe.title)
  )
  // ITERATION 5
  .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
  .then((info) => console.log('Success deleting item', info))
  // ITERATION 6
  .then(() =>
    mongoose.connection.close(() => {
      console.log('Disconnected from the database')
      process.exit(0)
    })
  )
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
