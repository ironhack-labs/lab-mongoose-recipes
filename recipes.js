const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose
  .connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

/*****************************************
 * Recipe Schema
 *****************************************/
const RecipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: { type: [] },
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: new Date() }
});

/*****************************************
 * Recipe Model
 *****************************************/
const Recipe = mongoose.model('Recipe', RecipeSchema);

Create my own recipe
Recipe.create({
  title: 'Hard Boiled Eggs',
  level: 'Easy Peasy',
  ingredients: ['1 large egg'],
  cuisine: 'World',
  dishType: ['Breakfast'],
  image:
    'https://www.seriouseats.com/recipes/images/2014/04/20140430-peeling-eggs-10.jpg',
  duration: 7,
  creator: 'Amelia'
})
  .then(recipe => {
    console.log(recipe.title);
  })
  .catch(err => {
    console.log(err);
  });

/*****************************************
 * Create Many Recipes
 *****************************************/
Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(recipe.title);
    });
  })
  .catch(err => {
    console.log(err);
  });

/*****************************************
 * Update Recipe
 *****************************************/
Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(message => {
    console.log('Successfully updated', message);
  })
  .catch(err => {
    console.log(err);
  });

/*****************************************
 * Remove Recipe
 *****************************************/
Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(message => {
    console.log('Successfully removed', message);
  })
  .catch(err => {
    console.log(err);
  });

/*****************************************
 * Close Database
 *****************************************/
setTimeout(() => {
  mongoose.connection
    .close()
    .then(() => {
      console.log('mongoose disconnected');
    })
    .catch(err => {
      console.log(err);
    });
}, 5000);
