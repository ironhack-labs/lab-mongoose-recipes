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

// console.log(recipeSchema)

const recipe = mongoose.model('recipe', recipeSchema);

recipe.create({ title: 'lo que sea', cousine: 'algo' })
  .then((recipe) => { console.log('funciono ', recipe.title) })
  .catch((err) => { console.log('error', err) });

recipe.insertMany(data)
  .then((recipe) => { console.log('funciono', recipe) })
  .catch((err) => { console.log('error', err) });

recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then((recipe) => { console.log('yey') })
  .catch((err) => { console.log('error') });

recipe.deleteOne({ title: "Carrot Cake" })
  .then((recipe) => { console.log('delete') })
  .catch((err) => { console.log('error') });