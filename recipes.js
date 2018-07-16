const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

//schema
const recipeSchema = new Schema({
  title: String,
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: Array,
  cousine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now() },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({ title: 'soy una receta', cousine: 'cocina' })
  .then((recipe) => { console.log(`create ${recipe.title}` })
  .catch((err) => { console.log('error', err) });

Recipe.insertMany(data)
  .then((recipe) => { 
    console.log(`insert many ${recipe}`)
  })
  .then(() => {
    return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then(() =>{
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(() => {
    return mongoose.connection.close();
    console.log('close mongoose')
  })
  .catch((err) => { console.log('error', err) });