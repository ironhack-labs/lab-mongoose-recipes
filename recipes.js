const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

const recipeSchema = new Schema ({
  title: { type: String, required: true, unique: true},
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: { type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now} //sets the date to now, so its always today
});

const Recipe = mongoose.model("Recipe", recipeSchema) //name of model, then name of Schema

//Recipe.insertMany({ data: 
  //   title: "Pizza Aparna", 
  //   level: "Amateur Chef", 
  //   ingredients: ["tomato","mozarella"], 
  //   cousine: "Italian", 
  //   dishType: "Dish",
  //   image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
  //   duration: 20,
  //   creator: "Lars and Aparna",
    
  //   })
  //   .then((recipe) => { console.log('The recipe is saved and its title is: ', recipe.title) })
  //   .catch((err) => { console.log('An error happened:', err) });
  
  Recipe.insertMany(data)
.then((recipe) => { recipe.forEach(function(e) {
  console.log(e.title);
});
})
.catch((err) => { console.log('An error happened:', err) });
  


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

