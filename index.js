const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

let oneRecipe = data[0];

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  /*   .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  }) */
  /*   .then(() => {
    Recipe.create(oneRecipe)
      .then((newRecipe) => console.log(`Created new user: ${newRecipe.title}`))
      .catch((err) => console.log(err));
    // Run your code here, after you have insured that the connection was made
  }) */
  /*   .then(() => {
    Recipe.insertMany(data).then((recipes) =>
      recipes.forEach((value) => console.log(value.title))
    );
  }) */
  /* .then(() => { */
    /*  Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { duration: 100 })
  .then(() => console.log('Sucess'))
  .catch((err) => console.log(err))
  }) */
/*     Recipe.deleteMany({ title: "Carrot Cake" })
      .then(() => {
        console.log("Sucess");
        mongoose.disconnect();
      })
      .catch((err) => console.log(err));
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
 */