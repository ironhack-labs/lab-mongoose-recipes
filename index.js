const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const paneerRecipe = {
  title: "Paneer Masala",
  ingredients: [
    "1/2 cup paneer pieces",
    "5 tablespoons cooking oil",
    "1/3 cup chpooed onions",
    "1/4 cup chopped tomatoes",
    "3 tablespoons ginger garlic paste",
    "1 spoon chilli powder",
    "salt to taste",
    "1 spoon garam masala powder",
    "1 spoon coriender powder",
  ],
  cuisine: "Indian",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    ///======================================================================
    Recipe.create(paneerRecipe)
      .then((allRecipes) => {
        console.log("-------- First Recipe added -------------");
        console.log(`Recepie documents created: ${allRecipes.title}`);

        // allRecipes.forEach((recipe) => console.log("Recipe name: ", recipe.title));

        return Recipe.insertMany(data)
          .then((allRecipes) => {
            // console.log(`Recepie documents created: ${allRecipes}`);
            // return Recipe.find();
            console.log(" --------- Array of Recipes added -------------");
            allRecipes.forEach((recipe) =>
              console.log("Recipe name: ", recipe.title)
            );
            console.log(" ----------------------");
            // update  using Model.findOneAndUpdate()
            const query = { title: "Rigatoni alla Genovese" };
            Recipe.findOneAndUpdate(query, { duration: 100 })
              .then((updatedRecipe) => {
                console.log(" --------- Update Query -------------");
                console.log(
                  `The duration of recipe ${updatedRecipe.title} updated`
                );
                console.log(" ----------------------");
                // Delete Carrot cake recipe
                Recipe.deleteOne({ title: "Carrot Cake" })
                  .then((deletedRecipe) => {
                    console.log(" ----------Delete Query------------");
                    console.log("deleted the  Carrot Cake Recipe  ");
                    console.log(" ----------------------");
                    // return Recipe.find();
                    // close the mongoose connection
                    mongoose.connection.close();
                  })
                  .catch((err) => {
                    console.log(
                      "Error while deleting Carrot Cake Recipe: ",
                      err
                    );
                    // close the mongoose connection
                    mongoose.connection.close();
                  });
              })
              .catch((error) => {
                console.log("Error while updating Recipe: ", error);
                // close the mongoose connection
                mongoose.connection.close();
              });
          })
          .catch((error) => {
            console.log(
              `Creating a new Recepie went wrong! Try again 😞 ${error}`
            );
            // close the mongoose connection
            mongoose.connection.close();
          });
      })
      .catch((error) => {
        console.log(`Creating a new Recepie went wrong! Try again 😞 ${error}`);
        // close the mongoose connection
        mongoose.connection.close();
      });

    //======================================================================
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
    // close the mongoose connection
    mongoose.connection.close();
  });

// create DB
// const Recipe = require("./models/Recipe.model.js");
