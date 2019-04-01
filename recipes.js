const mongoose = require('mongoose');
const Recipe = require('./models/models');
const Schema   = mongoose.Schema;
const data = require('./data');
const MONGODB_URI = 'mongodb://localhost:27017/recipeApp';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true})
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const newRecipe=
    {title: "Pescado podrido",
    level: "UltraPro Chef",
    ingredients: ["Pescado", "Sol", "Paciencia"],
    cuisine: "New Cuisine",
    dishType: ["Breakfast"],
    image: "https://stickershop.line-scdn.net/stickershop/v1/sticker/34516842/android/sticker.png;compress=true",
    duration: 480,
    creator: "Phuc Dat Bich"
  }
  
  Recipe.create(newRecipe)
    .then((newRecipe) => console.log("New recipe on the game:", newRecipe.title))
    .catch(error => console.error(error));

  Recipe.insertMany(data)
    .then(recipe => {console.log(recipe.title)})
    .catch(error => {console.log(error)})

  Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{ $set:{ duration: 100 }})
    .then(() => console.log('Recipe Rigatoni alla Genovese has been updated'))
    .catch(error => console.error(error));

  Recipe.findOneAndRemove({title: 'Carrot Cake'})
    .then(() => console.log('Recipe Carrot Cake has been removed!'))
    .then(() => mongoose.connection.close())
    .catch(error => console.error(error));
    
    
