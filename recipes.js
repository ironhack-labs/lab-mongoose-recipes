const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Create one recipe Schema
const recipeSchema = new Schema ({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: {
    type: Array,
  },
  cuisine: {
    type: String,
    required: true, 
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: '2018-11-08',
  },
});


const Recipe = mongoose.model("Recipe", recipeSchema);

// insert one recipe

Recipe.create({title: "eiofrifn", cuisine: "italian"})
.then(recipeDoc =>  {
  console.log("OH BOY")
})
.catch(err => {
  console.log("fuck off", err)
});

// Insert many recipes 
Recipe.insertMany(data)
.then(recipesDoc =>{
  console.log("did I just made it?")
})
.catch(err => {
  console.log("oh ok no I did not", err)
});

  // update duration
Recipe.findByIdAndUpdate(
  "5be466ca5e0ca062a8b7c78d",
{ $set: {duration: 100}}
)
.then(recipeDoc => {
  console.log("how good you are girl")
})
.catch(err => {
  console.log("keep trying", err)
});

// remove carrot cake (how dare you?!)
Recipe.findByIdAndRemove("5be46720a8d5f162e973a35f")
.then(recipeDoc => {
  console.log("Carrot cake is life")
})
.catch(err => {
  console.log("oh nooooo I told you carrot cake was LIFE", err)
});
