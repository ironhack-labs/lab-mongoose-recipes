const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const recipeSchema = new Schema({
    title: String,
    level: String,
    ingredients: [String],
    cuisine: String,
    dishType: String,
    image: { type: String, default:"https://images.media-allrecipes.com/images/75131.jpg."},
    duration: Number,
    creator: String,
    created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

  const MyRecipe = new Recipe({
    title: 'My sweet new recipe',
    level: 'Ninja Level',
    ingredients: ['Ing1','Ing2','Ing3','Ing4','Ing5'],
    cuisine: 'Mexican',
    dishType: 'Dish!',
    image: "https://images.media-allrecipes.com/images/75131.jpg.", 
    duration: 45,
    creator: "Chef Marco monter",
    created: Date.now()
  })

  MyRecipe.save({})  
  .then((recipe) => {
    console.log(recipe.name)
  })
  .catch((err) => {
    console.log("An error happened:" + err);
  });


  Recipe.insertMany(data)
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log("An error happened:" + err);
  });

  Recipe.findByIdAndUpdate("5c7dc095be79a82c33d7cec8", { $set: {duration: 100} })
  .then((data) => {
    console.log("The document was succesly updated!")
  })
  .catch((err) => {
    console.log("An error happened:" + err);
  });

  Recipe.findByIdAndRemove("5c7dc095be79a82c33d7cec7")
  .then((data) => {
    console.log("The document was succesly removed!")
  })
  .catch((err) => {
    console.log("An error happened:" + err);
  });

  process.on('SIGINT', () => {  
    mongoose.connection.close(() => { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 

  
module.exports = Recipe;


