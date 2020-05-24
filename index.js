
"use strict"

const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
//recipe for iteration 2
const empanadas = require('./recetas_propias/empanadas')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
mongoose.set('useFindAndModify', false);

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
    Recipe.create(empanadas).then(receta => { //ITERATION 2
        console.log(`Receta agregada con exito: ${receta.title}`)
      })
      .then(Recipe.insertMany(data).then(recetas => { //ITERATION 3
      [...recetas].forEach(elem => console.log(elem.title));
      }))
      .then(() => { //ITERATION 4
        let query = {title: 'Rigatoni alla Genovese'}
        Recipe.findOneAndUpdate(query, {duration: 100}, () => console.log(`Receta actualizada con exito`))})
      .then(() => { //ITERATION 5
        let query = {title: 'Carrot Cake'}
        Recipe.deleteOne(query, () => console.log(`Receta eliminada con exito`))
      })
      .then(() => mongoose.connection.close()) //ITERATION 6
      .then(() => console.log('Adios!'))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  

