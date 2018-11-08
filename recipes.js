const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

const createRecipe = () => Recipe.create({
  title: 'Too Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
});

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    mongoose.connection.db.dropDatabase();
    createRecipe()
      .then((recipe) => {
        console.log('The recipe is saved and its value is: ', recipe);
        Recipe.insertMany()
          .then((recipes) => {
            console.log('The recipe is saved and its value is: ', recipes);
            Recipe.updateRecipe()
              .then((recipes) => {
                console.log('Update the recipe');
                Recipe.removeRecipe()
                  .then((recipes) => {
                    console.log('Removed the recipe');
                    mongoose.connection.close();
                  })
                  .catch((err) => { console.log('An error happened:', err); });
              });
          });
      })
      .catch((err) => { console.log('An error happened:', err); });
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });


Recipe.insertMany(data);

Recipe.update({ title: 'Orange and Milk-Braised Pork Carnitas' }, { $set: { duration: 100 } });

Recipe.remove({ title: 'Carrot Cake' });
