const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


function createRecipe(title, level, ingredients, cuisine, dishType, image, duration, creator, created) {
 Recipe.create({
    title: title, 
    level: level, 
    ingredients: ingredients,
    cuisine: cuisine, 
    dishType: dishType, 
    image: image,
    duration: duration, 
    creator: creator, 
    created: created
  }).then(function (result) {
    console.log(result);
  });
}


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
   // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  createRecipe("Curry Lentil Soup","Amateur Chef", [
    "2 tablespoons tomato puree",
    "100g red lentils",
    "1 onion",
    "3 cloves of garlic",
    "1 chicken buillon cube",
    "Curcuma",
    "Paprika",
    "Zucchini"
  ], "Asian", "main_course", "https://midwestfoodieblog.com/wp-content/uploads/2020/03/FINAL-curry-lentil-soup-1.jpg", 40, "Chef Jessica");  

  Recipe.insertMany(data)
  .then(x => console.log(x))
  .catch(error => console.error(error))

  // const filter = {title: "Rigatoni alla Genovese"};
  // const update = {duration: 100}

//  Recipe.findOneAndUpdate(filter, update)
//   .then((RigatonifromDB) => {
//     RigatonifromDB.duration = 100;
//     Recipe.create(RigatonifromDB);
//     return RigatonifromDB;
//   })
//   .then((recipeChanged) => console.log(recipeChanged))
//   .catch((err) => console.log(err))

// Recipe.deleteOne({ title: "Carrot Cake" })
//   .then((sucess) => console.log(sucess))
//   .catch((error) => console.log(error));

// mongoose.connection.close();