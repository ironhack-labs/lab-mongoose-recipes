const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

// ----- schema -----

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  level: {
    type: String,
    valid: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    required: true
  },

  ingredients: {
    type: String
  },

  cousine: {
    type: String,
    required: true
  },

  dishType: {
    type: String,
    valid: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },

  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },

  duration: {
    type: Number,
    minimum: 0
  },

  creator: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

// ----- create one recipe -----

Recipe.create({ title: 'Late Night Pizza', level: 'Easy Peasy', ingredients: ['thats', '1 cup brown sugar', 'my', 'secret', 'recipe'], cousine: 'Italian', dishType: ['Other'], duration: 130, creator: 'Chef Nadia' });

// ----- create recipe database from file -----

Recipe.insertMany(data, function (err, recipies) {
  if (err) {
    console.log('there has been a problem, when trying to add all recipies');
  }
  for (let ix = 0; ix < recipies.length; ix++) {
    console.log(recipies[ix].title);
  }
});

// ----- update one recipe -----

Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } }, { new: true }, function (err) {
  if (err) {
    console.log('Something wrong when updating data!');
  }

  console.log('Successfully changed the time');
});

// ----- delete one recipe -----

Recipe.deleteOne({ title: 'Carrot Cake' }, function (err) {
  if (err) {
    console.log('there was an error, mate!');
  }
  console.log('successfully deleted Carrot Cake');
});

// ----- export Recipies -----

module.exports = Recipe;

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
