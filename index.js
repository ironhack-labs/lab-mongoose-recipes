const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    
    console.log("Orange and Milk-Braised Pork Carnitas")
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  function createRecipe (data){
      Recipe.create(data)
      .then(recipeCreated => console.log(`Recipe created: ${recipeCreated}`)) 
      .catch(error=>console.log("Recipe not found",error))
  }
//Iteracion 3
Recipe.insertMany(data)
.then(recipeCreated => console.log(`Recipe created: ${recipeCreated}`)) 
.catch(error=>console.log("Recipe not found",error))

//Iteracion 4

Recipe.updateOne({title:"Carrot Cake"}, {duration: 70})
          .then(updatedRecipe => console.log(`"Time Updated ", ${updatedRecipe}`))
          .catch(error => console.log("fallo ",error));
//Iteracion 5
          Recipe.deleteOne({title:"Chocolate Chip Cookies"})
          .then(recipe => console.log(`item deleted succesfully: ${recipe}`))
          .catch(error => console.log("fallo ", error));
//Iteracion 6


  let recipe = {
    //Iteracion 2
      
    title: "Orange and Milk-Braised Pork Carnitas",
    level: "UltraPro Chef",
    ingredients: [
      "3 1/2 pounds boneless pork shoulder, cut into large pieces",
      "1 tablespoon freshly ground black pepper",
      "1 tablespoon kosher salt, or more to taste",
      "2 tablespoons vegetable oil",
      "2 bay leaves",
      "2 teaspoons ground cumin",
      "1 teaspoon dried oregano",
      "1/4 teaspoon cayenne pepper",
      "1 orange, juiced and zested"
    ],
    cuisine: "American",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
    duration: 160,
    creator: "Chef John"
  
}

createRecipe(recipe)