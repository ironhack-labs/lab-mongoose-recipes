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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    try {
      await Recipe.create({ title: "spaghetti", cuisine: "italian" });
      const dataRecipe =await Recipe.insertMany(data);
      console.log("Done!");
      dataRecipe.forEach(recipe => {console.log(recipe.title)});
      await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, {new: true});
      console.log("changed Duration");
      await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log("deleted Carrot Cake");
      // mongoose.connection.close();
      process.exit();
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });