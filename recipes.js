const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema ({
  title : {
    type: String,
    unique: true
  },
  level: { 
    type: String, 
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: Array,
  cuisine: {
    type: String,
    required: true
  },
  dishType: { 
    type: String, 
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: { 
    type: String, 
    default: 'https://images.media-allrecipes.com/images/75131.jpg' 
  },
  duration: Number,
  creator: String,
  created: { 
    type: Date, 
    default: Date.now 
  },
})

const Recipe = mongoose.model('Recipe', recipeSchema);


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).then(() => {
    return Recipe.create({
      title : 'Really really good Guacamole',
      level: 'UltraPro Chef',
      ingredients: ['Tomato', 'Guac', 'Onion'],
      cuisine: 'Mexican',
      dishType: 'Dish',
      duration: 15,
      creator: 'Ines',
    })
  }).then(() => {
    return Recipe.create(data);
  }).then(() => {
    Recipe.find( { title: 'Guacamole'})
    .then((recipe) => {
      console.log(recipe.title);
    })
  }).then(() => {
      return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 }})
  }).then((recipe) => {
      console.log('Congratulations! You have updated Rigatoni time')
  }).then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  }).then(() => {
    console.log('Congratulations! Deleted!')
  }).then(() => {
    mongoose.connection.close();
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
