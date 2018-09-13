const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const data = require('./data.js')

const recipesSchema = new Schema({
  title: { type: String, required: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: [],
  cousine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now }
})

const Recipe = mongoose.model('Recipe', recipesSchema);

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    return Recipe.collection.drop();
  })
  .then(() => {
    Recipe.create({ title : "Arepas ReinaPepiada", cousine : "Venezuelan", level : "Easy Peasy" }) 
    console.log('Connected to Mongo!')
  }).then(() => Recipe.insertMany(data, (error, docs) => {}))
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

