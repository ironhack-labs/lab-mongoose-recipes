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
Recipe.collection.drop();

Recipe.create({
  titel: "Tacos",
  level: "Easy Peasy",
  cuisine: "Mexican",
  dishType: "Snack",
  creator: "Johnny"
})
  .then(recipe => {
    console.log(recipe.title);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.insertMany(data)
  .then(createdRecipe => {
    console.log(createdRecipe.map(recipe => recipe.title));

    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(result => {
        console.log("success!");
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(info => {
            console.log("Deleted!", info);
            mongoose.connection.close(() => {
              console.log("Connection closed");
            });
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

// const mongoose = require("mongoose"):
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: String,
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: Array,
  cuisine: {
    type: String,
    required: true
  },
  dishType: String,
  enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
