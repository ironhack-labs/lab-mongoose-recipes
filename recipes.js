const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


const recipeSchema = new Schema({
  title : { type:String, require:true, unique: true},
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients  : Array,
  cuisine: { type:String, require:true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0},
  creator: String,
  created: { 
    type: Date,
    default: Date.now
  }

});


const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop();
  })
  .then(()=> {

    return Recipe.insertMany(data)
    .then (recipe => { recipe.forEach((a)=> console.log(a.title)) })
    .catch (err => { console.log('An error happened:', err) });
 
  })
  .then(()=>{
    return Recipe.create({ title: 'Combullita', level: 'UltraPro Chef', cuisine: 'Carmen' })
    .then(recipe => { console.log(recipe.title) })
    .catch(err => { console.log('An error happened:', err) });

  })
.then (()=>{
  return Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(recipe => { console.log('Updated successfully') })
  .catch(err => { console.log('An error happened:', err) });
})
.then (()=>{
  return Recipe.deleteOne({ title: "Carrot Cake"})
  .then(recipe => { console.log('Deleted successfully') })
  .catch(err => { console.log('An error happened:', err) });
})



  .catch(err => {
    console.error('Error connecting to mongo', err);
  });




