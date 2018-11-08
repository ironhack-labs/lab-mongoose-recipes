const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipeSchema = new Schema ({
    title: {
      type: String,
      required: true, 
      unique: true
    },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: {type: Array},
    cuisine: {
      type: String,
      required: true
    },
    dishType: {
      type: String,
      enum: [ "Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: {
      type: Number,
      min: 0
    },
    creator: {type: String},
    created: {
      type: Date,
      default: Date.now
    }
  })

const Recipe = mongoose.model("recipe", recipeSchema);

Recipe.create ( {title: "Quiche", cuisine: "Lorraine"});

Recipe.insertMany(data)
.then(recipeDoc => {
  recipeDoc.forEach(oneRecipe => {
    console.log(oneRecipe.title);
  })
  console.log(recipeDoc.title);
})
.catch(err =>{
  console.log("InsertMany FAILURE !!!", err);
});

Recipe.updateMany(
  {title: {$eq: "Rigatoni alla Genovese"} },
  {$set: {duration: 100}}
)
  .then(result => {
    console.log ("Rigatoni alla Genovese UPDATED", result);
  })
  .catch(err => {
    console.log ("Rigatoni alla Genovese UPDATE FAILED", err);
  });

Recipe.deleteMany(
  {title: {$eq: "Carrot Cake"} }
)
  .then(result => {
    console.log ("Carrot Cake DELETED", result);
  })
  .catch(err => {
    console.log ("Carrot Cake DELETE FAILED", err);
  });