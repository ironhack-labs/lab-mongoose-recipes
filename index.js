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
    return Recipe.create({
      title: "Chocosana",
      level: "Easy Peasy",
      ingredients: [
        "eggs",
        "flour",
        "sugar",
        "chocolate powder",
        "butter",
        "milk",
      ],
      cuisine: "International",
      dishType: "dessert",
      image:
        "https://www.instagram.com/p/CHDFOvxLI20/?utm_source=ig_web_copy_link",
      duration: 60,
      creator: "Rosana Batista",
      created: new Date(2016, 08, 16),
    });
  })
  .then((newRecipe) => {
    console.log("This is the recipe: ", newRecipe.title);
    return Recipe.insertMany(data);
  })
  .then((newData) => {
    newData.forEach((recipe) => console.log("New recipes: ", recipe.title));
  })
  .then((updateRecipe) => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updateRecipe) => {
    console.log("Updated recipe: ", updateRecipe);

    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    console.log("this recipe was deleted: ", deletedRecipe);
    return mongoose.disconnect();
  })
  .then(() => {
    console.log("Mongoose is now disconnected from our database in MongoDB.");
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
