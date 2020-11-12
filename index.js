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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe1 = {
      title: "Pastel de Choclo",
      level: "Amateur Chef",
      ingredients: ["corn", "meat", "egg", "chicken", "onion"],
      cuisine: "chilean",
      dishType: "main_course",
      image: "https://doncucharon.com/fotos/recetas/144/pastel-de-choclo.jpg",
      duration: 120,
      creator: "Jaime",
    };

    const pr = Recipe.create(recipe1);
    return pr;
  })
  .then((createdRecipe) => {
    console.log("created Recipe", createdRecipe.title);

    const pr = Recipe.insertMany(data);
    return pr;
  })
  .then((allRecipies) => {
    allRecipies.forEach((recipe) => {
      console.log(recipe.title);
    });

    const pr = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
    return pr;
  })
  .then((updateDuration) => {
    console.log("duration update successfully!");

    const pr = Recipe.deleteOne({ title: "Carrot Cake" });
    return pr;
  })
  .then((deletedRecipe) => {
    console.log(
      "Successfully deleted:",
      deletedRecipe.deletedCount + " recipe"
    );

    mongoose.connection.close(() => {
      console.log("Disconnected from data base, Good Bye!");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
