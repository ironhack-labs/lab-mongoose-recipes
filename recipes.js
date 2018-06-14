const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')



const recipeSchema = new Schema({
  title : {type:  String, required: true, unique: true},
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients  : [String],
  cuisine: {type: String, required: true },
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now()}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Recipe.create({title: "Sushi", level: "UltraPro Chef", dishType: "Dish", cuisine: "japanese"})
// .then((recipe) => { console.log('The recipe is saved and its value is: ', recipe) })
// .catch((err) => { console.log('An error happened:', err) });

// Recipe.insertMany (data)
// .then((recipe) => { data.forEach((elem) => {console.log('The recipe is saved and its value is: ', elem.title)} )})
// .catch((err) => { console.log('An error happened:', err) });

// Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
// .then((recipe) => { console.log('duration was updated!') })
// .catch((err) => { console.log('An error happened:', err) });

// Recipe.deleteOne({title: 'Carrot Cake'})
// .then((recipe) => { console.log(`Recipe was removed!`) })
// .catch((err) => { console.log('An error happened:', err) });

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

setInterval(() => {
  db.close();
}, 5000);
