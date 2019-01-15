const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const recepieSchema = new Schema ({

    title: {
      type: String
      },

    level: {
      type: String, 
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] 
      },

    ingredients: {
      type: String
      },

    cuisine:{
      type: String,
      required: true,
      },

    dishType:  {
      type: String, 
      enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'], 
      },

    image: { 
      type: String, 
      default: 'https://images.media-allrecipes.com/images/75131.jpg' },

    duration: {
      type: Number,
      min: 0
      },

    creator: {
      type: String
      },

    created: { 
      type: Date,
      default: Date.now
      }
    });


const recepie = mongoose.model('recepie', recepieSchema);
module.exports = recepie;

recepie.create({ 
  title: 'Thai green chicken curry',
  level: 'Amateur Chef',
  ingredients: [ '1 tbsp vegetable oil', ' 2 tbsp ready-made Thai green curry paste', '6 chicken thighs, skin and bones removed, meat cut into strips', '400ml tin coconut milk', '2 lime leaves (optional)', '2 tbsp Thai fish sauce', '1 tbsp caster sugar', 'handful green beans, trimmed', 'handful asparagus spears', 'salt and freshly ground black pepper'],
  cuisine: 'Thai',
  dishType: 'Dish',   
  image: 'https://rasamalaysia.com/wp-content/uploads/2008/12/green_curry4.jpg',
  duration: 50,   
  creator: 'Someone',
  }) 
    .then(recepie => { console.log('The recepie is saved and its value is: ', recepie) })
    .catch(err => { console.log('An error happened:', err) });

  
    