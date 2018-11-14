const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');



const recipe = new Schema({
  title: { type: String, unique: true, required: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
})

const Recipe = mongoose.model('Recipe', recipe);
module.exports = Recipe;

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop()
  })
  .then(() => {
    Recipe.create({
      title: 'Cuban Rice',
      level: 'Easy Peasy',
      ingredients: ['1 cup rice', '2 fried eggs', '1/2 cup fried tomatoe', '1 fried banana'],
      cuisine: 'Mediteranean',
      dishType: ['Dish'],
      image: 'http://recetasdecocina.elmundo.es/wp-content/uploads/2016/11/receta-arroz-a-la-cubana.jpg',
      duration: 40,
      creator: 'Chef Colomer'
    }).then(() =>
      Recipe.insertMany(data))
      .then(() =>
        Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }))
      .then(() =>
        Recipe.deleteOne({ title: 'Carrot Cake' }),
        console.log('The Carrot Cake recipe was deleted'))
      .then(() =>
        mongoose.disconnect()
      )
      .then(console.log)
      .catch(err => console.log(err))
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


