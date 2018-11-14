const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: ' https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});


const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;





// Recipe.insertMany(data, function(error, docs) {}); 


// Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 }); // modificar dato


// Recipe.deleteOne({ title: "Carrot Cake"});


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    Recipe.collection.drop()
    .then(() => {
      return Recipe.create({ title: 'Gazpacho', level: 'Easy Peasy', cuisine: 'Española' })
    })    
      .then(recipe => { console.log('The user is saved and its value is: ', recipe.title) })
      .then(() => { return Recipe.insertMany(data)})
      .then(() => { return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 17 }, {new:true})})
      .then(() => { return Recipe.deleteOne({ title: "Carrot Cake" }); })
      .then(() => {mongoose.disconnect();})
      .catch(err => { console.log('An error happened:', err) });
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
