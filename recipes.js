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
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: [String],
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: new Date() },
});


const Recipes = mongoose.model('Recipes', recipeSchema);

Recipes.create({ title: "pancakes", level: "Easy Peasy", ingriedients: ["eggs", "milk"], cuisine: "american", dishType: "Breakfast", duration: 45, creator: "Emma" },
  function (err, user) {
    if (err) console.log('An error happened:', err);
    else console.log('title: ', user.title);
  })

Recipes.insertMany(data)
  .then((user) => {
    user.forEach(function (elem) { console.log("title: ", elem.title) })
  })
  .catch((err) => { console.log("An error happend:", err) })

// Recipes.findById({ _id: "5bdb002b7f9f430a3954f54e" })
//   .then(one => {
//     console.log("HHIIIIII", one);
//   })
//   .catch((err) => console.log(err))

Recipes.findByIdAndUpdate({ _id: "5bdb002b7f9f430a3954f54e" }, { duration: 100 })
  .then(() => {
    console.log("successfully updatet!")
  })
  .catch((err) => { console.log("notupdated", err) });

Recipes.findByIdAndRemove('5bdb002b7f9f430a3954f54d')
  .then((suc) => { console.log("removed", suc) })
  .catch((err) => { console.log("error:", err) })