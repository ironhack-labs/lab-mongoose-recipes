const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

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

    //ITERATION 2: CREATE NEW RECIPE
    const create = Recipe.create({ title: "Spag Bowl" }) //.create and other methods are promises!!
      //.save()  //--> QN FOR TA's - why does nodemon crash when I include this line?? (it was used in the course prework)
      .then((RecipeFromDB) => {
        console.log(RecipeFromDB);
      })
      .catch((error) => {
        console.log("error creating Spag Bowl recipe", error);
      });

    //ITERATION 3: INSERT RECIPES FROM DATA.JSON
    const insertRecipes = Recipe.insertMany(data)
      .then((result) => {
        //console.log(result);
        data.forEach((oneRecipe) =>
          console.log(`recipe name: ${oneRecipe.title}`)
        );
      })
      .catch((err) => {
        console.log(err);
      });

    //ITERATION 4: UPDATE RECIPE
    //create function to update recipe and AFTERWARDS, (line67) use promise.all constant to call it so the insert recipes is performed before the update
    const updateRecipe = function () {
      mongoose.set("useFindAndModify", false); // Needed b/c of DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true } //need this b/c useFindAndModify default is to return the object BEFORE the modification
      )
        .then((result) => {
          console.log(
            "The duration of Rigatoni alla Genovese was updated successfully!",
            result
          );
        })
        .catch((err) => {
          console.log("Error updating Rigatoni", err);
        });
    };

    const updateRigatoni = Promise.all([create, insertRecipes]).then(
      (result) => {
        updateRecipe();
      }
    );

    //ITERATION 5: DELETE CARROT CAKE
    const deleteCake = function () {
      Recipe.deleteOne({ title: "Carrot Cake" })
        .then((deletedRes) => {
          console.log(
            "The carrot cake has been successfully removed from the db",
            deletedRes
          );
        })
        .catch((err) => {
          console.log("Error removing carrot cake", err);
        });
    };

    const deleteCakePromise = Promise.all([insertRecipes]).then((result) => {
      deleteCake();
    });

    //ITERATION 6: CLOSE THE CONNECTION
    Promise.all([create, insertRecipes, updateRigatoni, deleteCakePromise])
      .then((result) => {
        console.log("The connection to the database has been closed");
      })
      .catch((err) => console.log("Error ending the connection to the db", err))

      .catch((error) => {
        console.error("Error connecting to the database", error);
      });
  });
