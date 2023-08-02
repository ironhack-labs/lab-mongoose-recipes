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
  .then(() => {
    return Recipe
      .create({ title: 'Pizza Popino', level: 'UltraPro Chef', ingredients:['sal', 'pepino', 'harina', 'tomate'], cuisine:'perruna', dishtype:'soup',
      duration: 20, creator: "Popino"})
      
  })

  .then(createRecipe => { console.log('La receta creada es:', createRecipe.title) })


  .then(()=> {
    return Recipe.insertMany(data)
  })

  .then(data => {console.log("Recetas creadas con exito", data)})

  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })

  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })

  .then(() => { console.log("success message after doing it!") })
  
  .then(() => {
    mongoose
      .disconnect(MONGODB_URI)
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

 

 





