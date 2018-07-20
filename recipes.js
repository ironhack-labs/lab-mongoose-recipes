const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

// Setting Schema for recipes
const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy','Amateur Chef','UltraPro Chef']},
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipes', recipeSchema);

// Creating one literal recipe 
Recipe.create({
  title:  'Thortilla de patatas',
  level: 'Easy Peasy',
  ingredients: ['huevos','patatas','aceite de oliva','sal','cebolla','pizca levadura'],
  cousine: 'Spanish',
  dishType: 'Dish',
  image: 'http://www.palacios.es/palacios/usuariosftp/conexion/imagenes142a.jpg',
  duration: 45,
  creator: 'Paula y Rafa',
  })
  .then(recipe => {
    console.log(recipe.title);
    // Inserting all the recipes from the data.js
    return Recipe.insertMany(data);
  })
  .then(() => {
    // Printing all recipes titles
    for (let i = 0; i < data.length; i++) console.log(data[i].title);
    // Updating
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese'},{duration: 100});
  })
  .then(() => {
    console.log('UPDATED MAN!')
    // Deleting
    return Recipe.deleteOne({ title: 'Carrot Cake'});
  })
  .then(() => {    
    console.log('DELETED!!');
    // Closing DB connection!
    return recipes.connection.close();
  })
  .catch(err => {
    console.log(err);
});




