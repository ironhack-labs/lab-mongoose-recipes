const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')


/** DEFINE RECIPE MODEL */
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: Array
  },
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
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


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');

    /** INSERT A RECIPE */
    Recipe.create({
      title: 'Burger',
      level: 'Easy Peasy',
      ingredients: ['bread', 'meat', 'ketchup', 'lettuce', 'onion', 'tomato', '2tbsp cumin'],
      cousine: 'American',
      dishType: 'Dish',
      image: 'https://www.epicurus.com/food/recipes/wp-content/uploads/2013/05/The-American-Burger.jpg',
      duration: 20,
      creator: 'Pat'
    })
      .then((recipe) => { console.log(`Your recipe ${recipe.title} has been added`) })
      .catch((err) => { console.log('An error has occured while adding your recipe:', err.message) })
      .then(() => {
        /** INSERT MANY */
        console.log('Attempting to insert recipes from data.js')
        return Recipe.insertMany(data);
      })
      .then((docs) => {
        let names = docs.map((recipe) => recipe.title).join(', ');
        console.log('Oh yeah! The following recipes where inserted:', names);

      })
      .catch((err) => {
        console.log('An error has occured while importing data.js', err.message);
      })
      .then(() => {
        /** UPDATE RIGATONI */
        let title = "Rigatoni alla Genovese";
        console.log(`Trying to fix the time on ${title}`);
        return Recipe.updateOne({ title: title }, { duration: 100 });
      })
      .then((res) => {
        /** REMOVE CARROT CAKE - who eats that shit anyways? */
        console.log('Successfully updated the recipe');
        return Recipe.remove({ title: 'Carrot Cake' });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .then((res) => {
        console.log('Successfully eradicated carrot cake!');
        /** CLOSE DB */
        console.log('Operations complete, closing DB');
        mongoose.connection.close();
      })


  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });