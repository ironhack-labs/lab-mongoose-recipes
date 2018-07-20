const mongoose = require('mongoose');
const data = require('./data.js');

const Schema   = mongoose.Schema;

const arr = data;

const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {
    type: String, 
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: {
    type: String, 
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: {type: Number, min: 0},
  creator: String,
  created: {
    type: Date, 
    default: Date.now
  }
});


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const Recipe = mongoose.model('Recipe', {recipeSchema});



Recipe.create({ 
  title: 'Tortilla de patatas',
  level: 'UltraPro Chef',
  ingredients: ['5 huevos', '3 patatas', 'chorrito de aceite', 'pizca de sal'],
  cousine: 'Española',
  dishType: ['Dish'],
  image: '',
  duration: 40,
  creator: 'Andy & Sandy'
 })
 .then((recipe) => {
   console.log('Title: ', recipe.title )

  })
  .then((recipe) => {
    Recipe.insertMany(arr)
    console.log('Title: ', recipe.title )
  })
  .then((recipe) =>{
    Recipe.updateOne( { title: 'Rigatoni alla Genovese' }, { duration: 100 })
    console.log('Duration successfully modified!')

  })
  .then((recipe) => {
    Recipe.remove({ title: 'Carrot Cake' })
    console.log('Successfully deleted.')
  })
  .then(() => {
    mongoose.connection.close();
  })
 .catch((err) => {console.log('An error happened: ', err),     mongoose.connection.close()
});



