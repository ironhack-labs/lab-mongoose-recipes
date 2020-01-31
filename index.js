const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error("Error connecting to mongo", err));

Recipe.create({
  title: "Pizza",
  level: "Easy Peasy",
  ingredients: ["flour", "yeast", "tomato sauce", "cheese"],
  cuisine: "Italian",
  dishType: "Dish",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 30
})
  .then(createdRecipe => {
    console.log(createdRecipe.title);
    Recipe.insertMany(data)
      .then(recipes => {
        console.log(recipes.map(recipe => recipe.title));

        Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(info => {
            console.log("Updated: ", info);

            Recipe.deleteOne({ title: "Carrot Cake" })
              .then(info => {
                console.log("Deleted: ", info);
                mongoose.connection.close();
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
