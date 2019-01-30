const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipeSchema = new Schema ({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum:['Easy Peasy','Amateur Chef', 'UltraPro Chef']},
    ingredients: {enum: []},
    cuisine: {type: String, required: true},
    dishType: {type:String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    creator: {type: String},
    created: {type: Date, default: Date.now}
  })

  const Recipe = mongoose.model('Recipe', recipeSchema);
  module.exports = Recipe;

  var arr = [...data]

  Recipe.create({title: 'Kartoffelsalat', level: 'Amateur Chef', ingredients: ['potatoes', 'onion', 'oil', 'vinegar', 'salt', 'pepper'], cuisine: 'German', dishType: ['Dish'],image: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjqvbe_7pXgAhWkxYUKHU7-B3sQjRx6BAgBEAU&url=https%3A%2F%2Fwww.curiouscuisiniere.com%2Fschwabischer-kartoffelsalat%2F&psig=AOvVaw16qmAgtsUyWDRGgr_MdCIt&ust=1548949970674574', duration: 25, creator: 'chef Müller'})
  .then(recipe => { 
    console.log (recipe.title)
    Recipe.insertMany(arr)
  .then(recipe => { 
     arr.forEach((recipe)=> {
       console.log("the recipe is called: "+ recipe.title)
     })
    Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(recipe => {
    console.log('recipe updated')
    Recipe.findOneAndRemove({ title: 'Carrot Cake'})
  .then(recipe => {
    console.log('Carrot Cake removed')

    mongoose.connection.close(() => {
      console.log("closed")
  })
  })
  })
  }) 
  })

  .catch(err => { console.log('an error happened: ', err)});

  