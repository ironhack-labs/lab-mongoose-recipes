const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then((responseFromMongoose) => {

  const myNewRecipe = {
    title: "Sotiris and Danial Cake",
    level: "Amateur Chef",
    ingredients: [
      "6 cups grated carrots",
      "1 cup brown sugar",
      "1 cup raisins",
      "4 eggs",
      "1 1/2 cups white sugar",
      "1 cup vegetable oil",
      "2 teaspoons vanilla extract",
      "1 cup crushed pineapple, drained",
      "3 cups all-purpose flour",
      "1 1/2 teaspoons baking soda",
      "1 teaspoon salt",
      "4 teaspoons ground cinnamon"
    ],
    cuisine: "International",
    dishType: "dessert",
    image: "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
    duration: 130,
    creator: "Chef Nadia"
  }; console.log(`This is my new recipe ${myNewRecipe.title}`)
  return Recipe.create(myNewRecipe)
  
})
.then((recipesFromDB) => {
  return Recipe.insertMany(data);
})
.then ((recipesFromDB) => {
  return Recipe.findByIdAndUpdate(
    "64135548d4db66c66ed96b8e",
     {duration: 100},
     { returnDocument: "after"}
);
})
.then(()=> {
  console.log("duration has been changed");
})
.then((recipesFromDB) => {
  return Recipe.deleteOne({title: "Orange and Milk-Braised Pork Carnitas"});
})
mongoose.connection.close()
.catch(error => {
    console.error('Error connecting to the database', error);
  });

