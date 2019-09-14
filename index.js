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


  // Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
  // .then(user =>{
  //   console.log("The recipe was modified succesfully");
  // })
  // .catch(err =>{
  //   console.log("An error happened: ",err);
  // });

  Recipe.deleteOne({ title: "Carrot Cake" })
  .then(recipe => {
    console.log("the recipe was deleted succesfylly");
  })
  .catch(err => {
    console.log("An error happened:", err);
  });