const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const recipe = new Schema({
  title : {
    type : String, unique : true, required : true, dropDups: true,
  },
  level: { enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients : { type : Array },
  cuisine : { type : String, required : true },
  dishType: { enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image : { type : String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration : { type : Number, min: 0 },
  creator : { type : String },
  created : { type : Date, default: new Date(+new Date() + 7 * 24 * 60 * 60 * 1000) },
});
