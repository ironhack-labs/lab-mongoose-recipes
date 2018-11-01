const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const recipeSchema = new Schema({
  /// no id, will be there automatically
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingedrients: [],
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg." },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now },
});

// -------------------- CREATE --------------------
// Create a model
let Recipe = mongoose.model("Recipe", recipeSchema);
// Recipe.create({
//   title: 'Pizza',
//   ingedrients: ['Tomato', 'Salami'],
//   cuisine: 'China',
// }).then((res) => {
//   console.log(res.title)
// }).catch((err) => {
//   console.log('something is wrong with the Recipe', err);
// })

// let food = Recipe.insertMany(data);

// Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
//   .then(console.log('success'))
//   .catch(console.log('error'));

// Recipe.deleteOne({ title: "Carrot Cake" })
//   .then(console.log('success'))
//   .catch(console.log('error'));

// If the Node process ends, close the Mongoose connection 

mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination');
  process.exit(0);
});
