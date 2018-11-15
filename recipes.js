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

  Recepie.created ({title: 'Spanish omelette'},
  {level: 'Easy Peasy'},
  {ingredients: ['eggs','potatoes','onion','oil']},
  {cuisine: 'Spanish'},
  {dishType: ['Dish']},
  {image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg'},
  {duration: 60},
  {creator: 'Chef Antonio'},);

  Recepie.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 220})
  .then(successCallback)
  .catch(errorCallback);

  User.deleteOne({ name: 'Carrot Cake'})
  .then(successCallback)
  .catch(errorCallback);