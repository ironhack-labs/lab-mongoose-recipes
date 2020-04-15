const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
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
  .then(async () => {
    const createRecipe = await Recipe.create({
      title: "Tiramisu",
      level: "Easy Peasy",
      ingredients: ["Coffee", "Mascarpone", "Biscuits", "Chocolate powder"],
      cuisine: "Italian",
      dishType: "dessert",
      image:
        "https://images.unsplash.com/photo-1568627175730-73d05bd69ca9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      duration: 90,
      creator: "Maxime",
    });
    console.log(`${createRecipe.title} recipe has been created!`);
    const insertRecipe = await Recipe.insertMany(data);
    insertRecipe.forEach((i) => {
      console.log(i.title);
    });
    const updateRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log(
      `${updateRecipe.title} has a new duration of ${updateRecipe.duration}`
    );
    const deleteRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log(`${deleteRecipe.deletedCount} recipe(s) has been delete`);
  })
  .catch((error) => {
    console.log("Error", error);
  })
  .then(() => mongoose.disconnect())
  .catch((error) => {
    console.log("Error while trying to disconnect", error);
  });
