const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')
var currentDate = new Date();

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true, 
    unique: true,
  },
  level: {
    type: String, 
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  },
  ingredients: [String],
  cousine: {
    type: String, 
    required: true,
  },
  dishType: {
    type: String, 
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
  },
  image: {
    type: String, 
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date, 
    default: currentDate.toDateString(),
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({title: "Poulet à la moutarde", level: "Easy Peasy", ingredients: ["Poulet", "Moutarde", "Oignons", "Sel", "Poivre"], cousine: "French", dishType: "Dish", image: "https://static.cuisineaz.com/610x610/i89759-poulet-a-la-moutarde-au-four.jpg", min: 60, creator: "Chef Nerimene" })
  .then(elem => {
    console.log(`Insert recipe DONE with ${elem.title}`);
  })
  .catch(err => {
    console.log("Insert recipe FAILURE!", err);
  });

  Recipe.insertMany(data)
    .then(elem => {
      console.log(`${elem.title}`);
    })
    .catch(err => {
      console.log("import data.js FAILURE", err);
    });

  Recipe.findByIdAndUpdate(
    "5b89316c2a058d04fd1c76c7",
    { $set: { duration: 100 } }
  )
    .then(elem => {
      console.log(`Duration of ${elem._id} UPDATED SUCCESSFULLY`);
    })
    .catch(err => {
      console.log("Duration UPDATE FAILURE", err);
    });


Recipe.findByIdAndRemove("5b89316c2a058d04fd1c76c6")
    .then(elem => {
      console.log(`Delete ${elem.title} SUCCESS`);
    })
    .catch(err => {
      console.log("Delete Carrot Cake FAILURE", err);
    });

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });