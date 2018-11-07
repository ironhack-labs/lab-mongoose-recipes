const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const recipeSchema = new Schema({
  title: { type: String },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: [],
  cuisine: { type: String },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

Recipe.create({
  title: 'Carrot Cake',
  level: 'Amateur Chef',
  ingredients: ['6 cups grated carrots', '1 cup brown sugar', '1 cup raisins', '4 eggs', '1 1/2 cups white sugar', '1 cup vegetable oil', '2 teaspoons vanilla extract', '1 cup crushed pineapple, drained', '3 cups all-purpose flour', '1 1/2 teaspoons baking soda', '1 teaspoon salt', '4 teaspoons ground cinnamon'],
  cuisine: 'International',
  dishType: ['Dessert'],
  // image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
  duration: 130,
  creator: 'Chef Nadia',
}, (err, recipe) => {
  if (err) {
    console.log('An error happen:', err);
  } else {
    console.log('Recipe save', recipe.title);
  }
});

Recipe.insertMany(data)
  .then(console.log(this.title))
  .catch(console.log('Error!!!'));

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(console.log(this.name, 'Updateded'))
  .catch(console.log('Error!!!!'));

Recipe.remove({ title: 'Carrot Cake' })
  .then('Deleted')
  .catch('Error!');
