const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    //******-- Crear recetas de data -- *****/

    //Recipe.create(data)

    //******-- Crear una receta-- *****/
    // Recipe.create({
    //   title: 'Tamal',
    //   level: 'UltraPro Chef',
    //   ingredients: ['hariba','azucar'],
    //   cuisine: 'cocina',
    //   dishType: 'Breakfast',
    //   duration:2,
    //   creator: 'elisa',
    //   created: Date.now()
    // })
    // .then(campusCreated => {
    //     res.render('index', campusCreated);
    // })
    // .catch(err => {
    //     res.render('index', err);
    // });
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

var query = { name: 'Rigatoni alla Genovese' };
Recipe.findOneAndUpdate(query, { duration: 100 })
  .then(() => {
    console.log('Success in update')
  })
  .catch (err => {
    console.log(err)
  });