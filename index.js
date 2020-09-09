const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    //----- ITERATION 2 | CREATION -----
    return Recipe.
      create({
        title: 'Spaghetti carbonara',
        level: 'Easy Peasy',
        ingredients: ['250g de spaghetonnis', '3 huevos', '75g de guancciale', '30g parmesano', '3 ajos', 'Pimienta', 'Sal'],
        cuisine: 'Italiana',
        dishType: 'main_course',
        duration: 20,
        creator: 'Davide Contrino'
      })

  })
  .then((createdRecipe) => {

    console.log('\n----- ITERATION 2 -----\nThe created recipe is:\n')
    console.log(createdRecipe)

    //----- ITERATION 3 | MULTI-CREATION -----

    return Recipe.
      create(data)

  })
  .then(Recipe.find())
  .then((allRecipes) => {

    console.log('\n----- ITERATION 3 -----\nThe name of the recipes are:\n')
    allRecipes.forEach(elm => console.log(elm.title))

    //----- ITERATION 4 -----

    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })

  })
  .then(() => {

    console.log('\n----- ITERATION 4 -----\nSuccess!!!!!\n')

    //----- ITERATION 5 -----

    return Recipe.deleteOne({ title: 'Carrot Cake' })

  })
  .then(() => {

    console.log('\----- ITERATION 5 -----\nSuccess!!!!!')

    //----- ITERATION 6 -----
    mongoose.connection.close()

  })
  .catch(error => {
    console.error('Error connecting to the database', error)
  })