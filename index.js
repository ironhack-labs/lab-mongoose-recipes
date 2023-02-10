const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model')
// Import of the data from './data.json'
const data = require('./data')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    return Recipe.deleteMany()
  })
  .then(async (x) => {
    //Iteration 2 - Create a recipe
    const Curry = await Recipe.create({
      title: 'Curry a la Romi',
      level: 'Amateur Chef',
      ingredients: [
        '3 potatos',
        '2 carrots',
        '2 cup of water',
        '2 soupspoons curry powder',
      ],
      cuisine: 'Indian',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 60,
      creator: 'Chef Romi',
      created: new Date(),
    })
    //Iteration 3 - Insert multiple recipes
    const allRecipe = await Recipe.insertMany(data)
    //console.log(allRecipe)

    //Iteration 4 - Update recipe
    const rigatoniDocument = await Recipe.findOne({
      title: 'Rigatoni alla Genovese',
    })
    const rigatoniDurationUpdate = await Recipe.findOneAndUpdate(
      rigatoniDocument,
      {
        duration: 100,
      },
      { new: true }
    )
    await rigatoniDurationUpdate.save()
    console.log('rigatoni after duration updates:', rigatoniDurationUpdate)

    //Iteration 5 - Remove a recipe
    await Recipe.findOneAndDelete({
      title: 'Carrot Cake',
    })
    console.log(allRecipe)
  })
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
  //Iteration 6 - Close the Database
  .finally(() => {
    mongoose.connection.close()
  })
