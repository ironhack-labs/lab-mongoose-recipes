const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    //return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Recipe.deleteMany();

//ITERATION 3, deleted the manual entry one
// Recipe.insertMany(data).then((response) => {
//   response.forEach((addedDoc) => {
//     console.log("added the recipe: ", addedDoc.title);
//   });
// });

//ITERATION 4
// Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
//   .then((response) => {
//     console.log(
//       "successfully updated Rigatoni alla Genovese duration to 100",
//       response
//     );
//   })
//   .catch((err) => {
//     console.log("something went wrong updating Rigatoni alla Genovese: ", err);
//   });

//ITERATION 5
Recipe.deleteOne({ title: "Carrot Cake" })
  .then((response) => {
    console.log("successfully deleted the carrot cake recipe");
  })
  .catch((err) => {
    console.log("something went wrong when deleting carrot cake recipe", err);
  })
  .finally(() => {
    mongoose.connection.close(); //ITERATION 6
  });
