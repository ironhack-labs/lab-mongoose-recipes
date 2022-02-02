const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())

  // ITERATION 2

  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made
  //   return Recipe.create({
  //     title: 'Noodles con verduras',
  //     level: 'Easy Peasy',
  //     ingredients: ['noodles', 'zanahoria', 'brocoli', 'pimiento', 'anacardos', 'salsa de soja'],
  //     cuisine: 'Asian',
  //     dishType: 'main_course',
  //     image: 'https://estaticos.marie-claire.es/media/cache/706x530_thumb/uploads/images/recipe/59356d015cafe8006d3c9869/wok-noodles-verduras-d2.jpg',
  //     duration: 30,
  //     creator: 'Guille Ávila'
  //   })
  // })
  // .then(newRecipe => {
  //   console.log('Nueva receta creada: ', newRecipe.title)
  // })


  // ITERATION 3 -- a create le podemos pasar un array de objetos, no hace falta convertirlo en objeto (da error)

  .then(() => {
    return Recipe.create(data)
  })
  // .then(newRecipes => newRecipes.forEach(elm => console.log(elm.title)))


  // ITERATION 4
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })

  // .then((recipeUpdated) => {
  //   console.log('The new duration is:', recipeUpdated.duration)
  // })


  // ITERATION 5
  .then(() => {
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' })
  })

  // el deletedRecipe.title no es accesible una vez se ha borrado de la BBDD utiliando .deleteOne
  // si utilizamos .findOneAndDelete, se guarda la info de la receta para luego consolear algún dato

  .then((deletedRecipe) => {
    console.log('Succesfully deleted: ', deletedRecipe.title)
  })


  // ITERATION 6
  .then(() => {
    mongoose.connection.close(() => {
      console.log('Mongoose is disconnected')
    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
