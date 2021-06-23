
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
    Recipe
      .create([{ title: 'Sopa de Cebolla', level: 'UltraPro Chef', ingredients: ['Cebolla', 'Agua', 'Sal'], cuisine: 'Picas todo  picadito y lo dejas picar un rato.' }])
      .then(theNewRecipe => console.log('La nueva receta fue creada:', theNewRecipe[0].title))
      .then(theSecond => { return Recipe.create(data) })
      .then(theThird => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }))
      .then(theFourth => { return Recipe.deleteOne({ title: 'Carrot Cake' }) })
      .then(theFifth => { mongoose.connection.close() })

      .catch(err => console.log('Se produjo un error.... =>', err))



    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
