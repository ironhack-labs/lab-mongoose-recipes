const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const {
  findByIdAndDelete,
  findOneAndDelete,
} = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    async function addRecipe() {
      const recipe = await Recipe.create({
        title: "Michelada con camaron",
        level: "UltraPro Chef",
        ingredients: [
          "Cerveza barata",
          "clamato",
          "camarones",
          "salsa inglesa",
        ],
        cuisine: "Tradicional Mexicana",
        dishType: "drink",
        image:
          "https://grupoenconcreto.com/wp-content/uploads/michelada-1-533x261.jpg",
        duration: 5,
        creator: "Chespirito",
      });
      console.log(recipe.title);
      await Recipe.insertMany(data);
      let recipesTitles = await Recipe.find({}, { title: 1 });
      console.log(recipesTitles);
      await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        {
          returnOriginal: false,
        }
      );
      console.log(`Rigatoni alla Genovese duration updated!`);

      await Recipe.findOneAndDelete({ title: "Carrot Cake" });
      console.log("Carrot Cake Recipe removed!");
      recipesTitles = await Recipe.find({}, { title: 1, duration: 1 });
      console.log(recipesTitles);
      await mongoose.connection.close();
      console.log(`mongoose connection closed`);
    }

    addRecipe();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
