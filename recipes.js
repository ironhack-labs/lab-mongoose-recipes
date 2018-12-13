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
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"] },
  ingredients: { type: Array, required: true },
  cuisine: String,
  dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Others"] },
  image: { type: String, default: "http://www.unstuffed.org.uk/wp-content/uploads/VS-0015_Halloumi_red_pepper_spinach_and_harissa_wrap-1450x520.jpg" },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;


Recipe.remove().then(() => {
  Recipe.create({ title: "Halloumi Wrap", level: "Easy Peasy", ingredients: ["Wrap", "Halloumi", "Lettuce", "Falafel", "Bell Pepper", "Hummous", "Raw Cabbage", "Grated Carrot"], cuisine: "Middle-Eastern", dishType: "Dish", duration: 30, creator: "Us" })
    .then((halloumi) => {
      Recipe.insertMany(data)
        .then(recipes => {
          for (let i = 0; i < recipes.length; i++) {
            console.log(recipes[i].title);
          } console.log(halloumi.title);
        })
        .catch(err => { console.log("THERE IS AN ERRRRRROR", err) });
    })
});