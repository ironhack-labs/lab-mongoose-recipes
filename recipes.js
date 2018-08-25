const mongoose = require('mongoose');
const data = require('./data.js')
const Schema   = mongoose.Schema;

// Import de recipe class
// const Recipe = require('./models/recipe')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipeSchema = new Schema({
    title : String,
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: {type: Array},
    cousine: {type: String},
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'], required: true},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration: {type: Number, min: 0},
    creator: String,
    created: {type: Date, default: Date.now}
  });
    
  const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({
  title: 'Strudel',
  level: 'Dessert'
})
.then((Recipe) => { console.log('The user is saved and its value is: ', Recipe) })
.catch((err) => { console.log('An error happened:', err) });

Recipe.insertMany(data, function(docs, err) {});

Recipe.updateOne({name: "Rigatoni alla Genovese"})
.then(() => {
  console.log('Connected to Mongo!')
}).catch(err => {
  console.error('Error connecting to mongo', err)
});

Recipe.deleteOne({title:"Carrot Cake"})
.then(() => {
  console.log('Connected to Mongo!')
}).catch(err => {
  console.error('Error connecting to mongo', err)
}).then(() => {
  mongoose.connection.close();
});