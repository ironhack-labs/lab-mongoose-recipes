const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [],
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({
  title: 'Horse liver',
  level: 'Easy Peasy',
  ingredients: ['horse liver', 'garlic', 'parsley'],
  cousine: 'Traditional',
  dishType: 'Dish',
  image: 'https://static.vix.com/es/sites/default/files/imj/otramedicina/P/Propiedades-de-la-carne-de-h%C3%ADgado-1.jpg',
  duration: 20,
  creator: 'My grandma',
})
  .then(recipe => {
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })
  .then(() => {
    data.forEach(recipe => {
      console.log(recipe.title);
    });
    return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100});
  })
  .then(() => {
    console.log('Successful update!');
    return Recipe.remove({title: 'Carrot Cake'});
  })
  .then(() => {
    console.log('Successful remove!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Something goes wrong', err);
    mongoose.connection.close();
  });





