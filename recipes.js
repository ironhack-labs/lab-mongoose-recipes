const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

//promise
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() =>  console.log('Connected to Mongo!'))
  .catch(err =>  console.error('Error connecting to mongo', err))


//define schema
  const recipeSchema = new Schema({
    title :  { type: String, required: true, unique: true },
    level:  { type: String, enum: [ 'Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: { type: [] }, // [] == Array
    cuisine:  { type: String, required: true },
    dishType:   { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink',  'Dessert', 'Other'] },
    image:  { type: String,  default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration:  { type: Number, min: 0 },
    creator:   String ,
    created:  { type: Date, default: Date.now}
  })

// compile schema to model (with collection name Recipe)
  const Recipe = mongoose.model('Recipe', recipeSchema);
  module.exports = Recipe;


  // The same code as above but with a Promise version
Recipe.create({ 
  title: 'Hotpot', 
  level: 'Amateur Chef', 
  ingredients: ['potatoes', 'carrots', 'onions'], 
  cuisine: 'dutch', 
  dishType: 'Dish' })
 .then(recipe => { console.log('The new receipe is saved: ', recipe) })
 .catch(err => { console.log('An error happened:', err) });


//insertMany
Recipe.insertMany(data, function(err, data) {
  if (err){ 
    return console.error(err);
} else {
  console.log("Multiple documents inserted to Collection");
}
});

// });
// .then(recipe => { console.log('The new receipes are saved: ', recipe) })
// .catch(err => { console.log('An error happened:', err) });


//modify  Rigatoni alla Genovese, for first match change duration to 100
Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() =>  console.log('Successfully updated'))
  .catch(err =>  console.error('Error updating  mongo', err))


// removing from database Carrot Cake
Recipe.deleteOne({ title: 'Carrot Cake'})
.then(doc=>  console.log('Successfully DELETED' ))
.catch(err =>  console.error('Error DELETING  document', err))

