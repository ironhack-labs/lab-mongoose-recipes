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
    title : {type: String, required: true, unique: true},
    level : {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: [],
    cuisine: {type: String, required: true},
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other' ]},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min: 0},
    creator: String,
    created: {type: Date, default: Date.now}
  });

  const Recipe = mongoose.model('Recipe', recipeSchema);
  
  Recipe.create(
    {title: 'Chicken with Chipotle Sauce',
    level: 'Easy Peasy',
    ingredients: ['Chicken', 'Chipotle','Tomato Sauce','Garlic','Mayo','Cold Beverage'],
    cuisine: 'Flores Original',
    dishType: 'Dish',
    duration: 90,
    creator: 'Luis Flores'},
    function (err, title) {
      if (err) console.log('An error occured:', err);
      else console.log('The recipe was saved and its called: ', title);
  });

  Recipe.insertMany(data, function (err, title){
    if (err) console.log('An error occured when adding the other recipes:', err);
    else console.log('The recipes were saved and they are called: ', title);
  });

  Recipe.find({}, (err, recipes) => {
    recipes.forEach((recipe) => {
      console.log('Recipe title: ', recipe.title); 
    });
  });

  Update the duration of Rigatoni alla Genovese to 100.
 Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(recipe => { console.log('Success!')})
  .catch(err => { console.log('An error occured:', err) }); 

  Delete the Carrot Cake recipe.
 Recipe.deleteOne({ title: "Carrot Cake"})
  .then(recipe => { console.log('Delete success!')})
  .catch(err => { console.log('An error occured:', err) }); 

Closes the connection to the recipeApp database.
mongoose.connection.close()