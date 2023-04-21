const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const recipeDoc = {
  title: "Ramadan",
  cuisine: "Expert chef",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 2
    return Recipe.create(recipeDoc);
  })

  // Iteration 3
  .then((recipe) => {
    console.log("here is the res", recipe);
    return Recipe.insertMany(data);
  })

  .then((allRecipes) => {
      console.log(`recipe for ${allRecipes} uploaded succefully`)
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })

  // Iteration 4
  .then((updatePasta) => {
    console.log("Successfully Updated!", updatePasta);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  // Iteration 5
  .then((removeCarrots) => {
    console.log("No More Carrots!", removeCarrots);
    mongoose.connection.close();
  })

  .then((closing) => {
    console.log("Connection Closed!");
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
    console.log("Connection Closed!");
  });


  //Josh's solution for Async/Await
//   const handleRecipes = async() => {
//     try {
//       //delete mongoose.connect(MONGODB_URI) till Recipce.deletemany
//       await mongoose.connect(MONGODB_URI)
//       console.log('connected!');
//       await Recipe.deleteMany();
//       console.log('DB cleaned');

//       const newRecipe = await Recipe.create(recipeDoc);
//       console.log("New recipe added", newRecipe)

//       const manyRecipes = await Recipe.insertMany(data);
//       console.log("Many recipes added", manyRecipes);

//       const updatedRecipe = await Recipe.findOneAndUpdate(
//         { title: "Rigatoni alla Genovese" },
//         { duration: 100 },
//         { new: true }
//       );
//       console.log('Recipe updated', updatedRecipe);

//       await Recipe.deleteOne({ title: "Carrot Cake" });
//       console.log('Recipe was deleted');

//       await mongoose.connection.close();
//       console.log('Connection closed!')
//     }
// catch(err){
//   console.log('There was an error', err)
// }
//   }
//   handleRecipes();
