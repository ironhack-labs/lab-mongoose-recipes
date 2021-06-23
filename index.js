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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    return Recipe.syncIndexes()
  })


  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe

    //   .create({ title: 'Arroz con pollo', level: 'Amateur Chef', ingredients: ['arroz', 'pollo'], cuisine: 'normal', dishType: 'main_course', duration: 20, creator: 'Hackerxander' },
    //     { title: 'Arroz con pollo', level: 'Amateur Chef', ingredients: ['arroz', 'pollo'], cuisine: 'normal', dishType: 'main_course', duration: 20, creator: 'Hackerxander' })
    //   .then(theNewRecipe => console.log('¡La nueva receta fué creada!:', theNewRecipe.title))
    //   .catch(err => console.log('Se produjo un error.... =>', err))

    return Recipe
      .create(data)
      .then(recipe => console.log('las recetas son:', recipe))

  })
  .then(() => {
    return Recipe
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true })
      .then(theNewDuration => console.log('la nueva duracion de la receta es:', theNewDuration))
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })

  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);

  })


