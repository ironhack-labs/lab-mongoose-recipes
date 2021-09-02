const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
console.log(data)

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
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
     Recipe
     .create({ title: 'Paella', level: 'Easy Peasy' , ingredients: ['rice','water','seafood','vegetables'], cuisine: 'Spanish', dishType: 'main-course', duration: 130, creator: 'uknown' })
    .then(newRecFromDB => console.log('La nueva receta es', newRecFromDB))
    .catch(err => console.log('ERROR DE MONGOOSE ---- ', err))

      Recipe
      .create(data)
      .then(theNewRecipes => {
        theNewRecipes.forEach(elm => console.log(`Esta receta se llama ${elm.title}`))
      })
      .catch(err => console.log('ERROR DE MONGOOSE ---- ', err))
      
      Recipe
      .updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then(info => console.log("Los detalles de la modificación son:", info))
      .catch(err => console.log('Hubo un error', err))

      Recipe
      .deleteOne({ title: 'Carrot Cake' })
      .then(info => console.log('Este es un objeto informativo sobre una elimiación', info))
      .catch(err => console.log('Se produjo un error', err))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

   // mongoose.connection.close()