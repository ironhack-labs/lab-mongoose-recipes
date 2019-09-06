const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// const Recipe = mongoose.model("Recipe", recipeSchema);
// module.exports = Recipe;

Recipe.create({
  title: "Carrot Cake",
  level: "Amateur Chef",
  ingredients: [
    "6 cups grated carrots",
    "1 cup brown sugar",
    "1 cup raisins",
    "4 eggs",
    "1 1/2 cups white sugar",
    "1 cup vegetable oil",
    "2 teaspoons vanilla extract",
    "1 cup crushed pineapple, drained",
    "3 cups all-purpose flour",
    "1 1/2 teaspoons baking soda",
    "1 teaspoon salt",
    "4 teaspoons ground cinnamon"
  ],
  cuisine: "International",
  dishType: "Dessert",
  image: "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
  duration: 130,
  creator: "Chef Nadia"
})
  .then(() => {
    console.log("Recipe has been inserted");
  })
  .catch(err => {
    console.log("Zonk");
  });

console.log("Hallo");
Recipe.insertMany(data)
  .then(data => {
    console.log(data);
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then(data => {
        console.log(data);
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(data => {
            console.log(data);
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
  .catch(err => {
    console.log(err);
  });
