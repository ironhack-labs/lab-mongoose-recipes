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
    useUnifiedTopology: true
  })

  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`)
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase()
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //Iteration 2 - Create a recipe
    const myRecipe = new Recipe({
      title: 'Rissotto Funghi',
      level: 'Easy Peasy',
      ingredients: ['1 cup of rice', '300grs Funghi', '1 Onion', 'White wine'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 30,
      creator: 'Andrés Martínez'
    })

    myRecipe
      .save()
      .then((recipe) => console.log('The recipe was created'))
      .catch((error) =>
        console.log('An error occurred creating a recipe', error)
      )
  })

  .then(() => {
    //Iteration 3 - Insert multiple recipes
    Recipe.insertMany(data)
      .then(() => {
        console.log('The recipes were inserted')
        data.forEach((el) => console.log(`${el.title} added`))
      })

      .then(() => {
        //Iteraciones que ocurren una vez que termine el proceso de insertar la data con todas las recetas
        //Iteration 4 - Update recipe
        Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
          .then(() => console.log('The recipe was updated'))
          .catch((error) =>
            console.log('An error ocurred updating a recipe', error)
          )
      })

      .then(() => {
        //Iteration 5 - Remove a recipe
        Recipe.deleteOne({ title: 'Carrot Cake' })
          .then(() => console.log('The recipe was deleted'))
          .catch((error) =>
            console.log('An error ocurred deleting a recipe', error)
          )
      })

      .catch((error) => console.log('An error ocurred', error))
  })

  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
