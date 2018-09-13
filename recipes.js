const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')
const Recipe = require('./models/recipeschema.js');


function createRecipe() {
  Recipe.create({ title: 'Chocolate Crepes', level: 'Easy Peasy', cousine: 'France', dishType: 'Dessert', image: 'https://www.recetas360.com/wp-content/uploads/2018/02/receta-de-crepes.jpg', duration: 15 })
  .then(() => { console.log('Recipe created!!') })
  .catch (() => { console.log('Error, no recipe')})
};

function insertRecipe () {
  Recipe.insertMany(data)
  .then(() => {console.log('data updated')})
  .catch (() => { console.log('Error, no updated')})
}

function updateRecipe () {
  Recipe.findByIdAndUpdate ("5b9a755f02f83a8d798b664d", {duration: 100})
  .then(() => { console.log('successful update') })
  .catch (() => { console.log('Error update')})
}
function removeRecipe () {
  Recipe.findByIdAndRemove("5b9a755f02f83a8d798b664c")
  .then(() => { console.log('successful delete') })
  .catch (() => { console.log('Error delete')})
}


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {

    console.log('Connected to Mongo!');
    })

  .then(()=>{
   return createRecipe();
    
  })
  .then(()=>{
    return insertRecipe();})
  .then(()=>{
    return updateRecipe();
  })
  .then(()=>{
    return removeRecipe();
  })
  .then(()=>{
    mongoose.disconnect()
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

