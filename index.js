const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
// no recipe have the same name
//name{
// unique: true
//}

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  /*.then(() => {
    return Recipe.create({
      title: "SriLankan polos curry",
      level: "Amateur Chef",
      ingredients: [
        "jackfruit",
        "coconut milk",
        "curry powder",
        "chili powder",
        "onion",
        "turmeric",
        "giger",
        "garlic"
      ],
      cuisine: "SriLankan",
      dishType: "main_course",
      duration: 30,
      creator: "Sandy"
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });*/
  .then(() => {
    return Recipe.insertMany(data)
      .then((recipe) => {
        return recipe.map((result) => console.log(result.title));
      })
      .then(() => {
        console.log("Update succesful");

        return Recipe.findOneAndUpdate(
          {
            title: "Rigatoni alla Genovese"
          },
          { duration: 100 },
          { new: true }
        );
      })
      .then((recipe) => {
        console.log("Rigatoni is updated", recipe.duration);
        return Recipe.deleteOne({ title: "Carrot Cake" });
      })
      .then((error) => {
        console.log("Carrot cake has been deleted");
        return mongoose.disconnect();
      });
  });
