const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  const recepieSchema = new Schema({
    title:  { type: String, required: true, unique: true},
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']}, 
    ingrediets: [],
    cuisine: { type: String, required: true},
    dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert','Other'] },
    image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: { type: Number, min:0 },
    creator: { type: String },
    created: { type: Date, default: Date.now },
  });

  const Recepie = mongoose.model('Recepie', recepieSchema);
    module.exports = Recepie;

    console.log(Recepie);