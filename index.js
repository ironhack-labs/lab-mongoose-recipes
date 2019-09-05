const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
const MONGODB_URI = 'mongodb://localhost'
const DATABASE_NAME = 'recipeApp'
mongoose
  .connect(`${MONGODB_URI}/${DATABASE_NAME}`, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//Put averything inside delete many

Recipe.deleteMany({}).then(() => {
  Recipe.create({
    title: "Lents' stew",
    level: "Easy Peasy",
    ingredients: ["onion", "tomato", "sweet pepper", "red sausage", "bacon"],
    cuisine: "Argentine",
    duration: 240,
    creator: "Joaquin"
  })
  .then(createdRecipe => {
    console.log("The title of the recipe is " + createdRecipe.title);

    Recipe.create(data).then(recipes => {
      console.log("recipes", recipes.map(recipe => recipe.title));

      Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(res => {
        console.log(`The update was succesful and updated ${res.nModified} recipe`,res);
          //res or whatever we name it logs an object that is the result of the update
        Recipe.deleteOne({ title: "Carrot Cake" })
        .then(res => {console.log(`The Carrot Cake was deleted `);
            //this is why everything is nested. After creating everythin, the connection is closed
            mongoose.connection.close();
            })
        .catch("Err there was an error");
      })
      .catch(err => console.log("Err there was an error"));
    });
  });
});

