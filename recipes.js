const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  const recipeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    level: { type: String, enum: ['Easy Peasy','Amateur Chef','UltraPro Chef'] },
    ingredients: { type: Array},
    cuisine: {type: String, required: true,},
    dishType: {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
    image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    creator: {type: String},
    created: {type: Date, default:Date.Today}
  });

  const Recipe =  mongoose.model('Recipe', recipeSchema);

  Recipe.create({title: data[0].title, level: data[0].level, cuisine:data[0].cuisine,image: "https://images.media-allrecipes.com/images/75131.jpg"})
  .then((recipe) => { console.log('The user is saved and its value is: ', recipe) })
  .catch((err) => { console.log('An error happened:', err) });





