const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

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
    
    //    Iteration 2: Create a new recipe
    let hotCakes = {
      title: "Hot Cakes",
      level: "Easy Peasy",
      ingredients: ["huevos", "mantequilla", "harina para hot cakes", "leche"],
      cuisine: "French",
      dishType: "breakfast",
      image: "https://images.aws.nestle.recipes/resized/4ba3978c241c628affcaf5c4e837270e_hot_cakes_clasicos_-_desayuno_1200_600.jpg",
      duration: 22,
      creator: "Chefcito",
      created: "2022-09-03",
    };

    //Crate
    Recipe.create(hotCakes)
      .then((x) => console.log(x))
      .catch((error) => console.log(error));

      //  Iteration 3: Insert multiple recipes
      Recipe.insertMany(data)
        .then((x) => console.log(x))
        .catch((error) => console.log(error));
      
      //  Print the title of each recipe to the console
      console.log("Titles List:")
      Recipe.find({},{title:1, _id:0})
        .then((x) => console.log(x))
        .catch((error) => console.log(error));

      // Iteration 4: Update recipe
      Recipe.findOneAndUpdate({_id:"631379e0939e89562b0a2435"}, { duration: 100 })
        .then(() => console.log("Recipes updated successfully !!!"))
        .catch((error) => console.log(error));

      // Iteration 5: Remove a recipe
      Recipe.deleteOne({title:"Carrot Cake"})
        .then(() => console.log("Carrot Cake removed successfully !!!"))
        .catch((error) => console.log(error));        


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
