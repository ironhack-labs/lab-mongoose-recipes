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
  title : String,
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [],
  cousine: {type:String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
});



const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({
    title: 'Homemade Chicken Nuggets', 
    level: 'Easy Peasy', 
    ingredients: ['Chicken Breasts','Flour','Salt', 'Eggs', 'Black Pepper', 'Water', 'Breadcrumbs', 'Vegetable Oil'],
    cousine: 'International', 
    dishType: 'Snack',
    image: './images/nuggets.jpg',
    duration: 20,
    creator: 'Chef Pioneer Woman'
})
.then((recipe) => { console.log ('Title: ', recipe.title)})
.catch((err) => {console.log('An error occured: ', err)});


Recipe.insertMany(data);


Recipe.findByIdAndUpdate("5ae22679d22c6527d196b20d",  {duration: 100})
  .then((recipe) => { console.log ('Succes!')})
  .catch((err) => {console.log('An error occured: ', err)});


 Recipe.findByIdAndRemove("5ae22679d22c6527d196b20c")
   .then((recipe) => { console.log ('No more carrot cake!!')})
   .catch((err) => {console.log('An error occured: ', err)});
   
   
mongoose.disconnect();

