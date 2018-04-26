const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema ({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef' ]},
  ingredients: [],
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
})

const Recipe = mongoose.model('Recipe', recipeSchema);

// ITERATION 2
// Recipe.create({ title: 'Pizza', level: 'Easy Peasy', ingredients: ['dough', 'cheese', 'tomato sauce', 'garlic'], cousine: 'Italian', dishType: 'Other', duration: 10, creator: 'Chef Boyardee'})
//   .then((title) => { console.log('The recipe is saved and its value is: ', title) })
//   .catch((err) => { console.log('An error happened:', err) });

// ITERATION 3
// Recipe.insertMany(data)
//   .then((title) => { console.log('The recipe is saved and its value is: ', title) })
//   .catch((err) => { console.log('An error happened:', err) });

// ITERATION 4
// Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
//   .then((title) => { console.log('Success! The recipe was updated and saved') })
//   .catch((err) => { console.log('An error happened:', err) })

// ITERATION 5
// Recipe.deleteOne({ title: "Carrot Cake"})
//   .then((title) => { console.log('Success! The recipe was deleted') })
//   .catch((err) => { console.log('An error happened:', err) })


//ITERATION 6
mongoose.connection.close();
