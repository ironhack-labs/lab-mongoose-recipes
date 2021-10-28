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
    const newRecipe = {
      title: "Brigadeiro",
      level: "Easy Peasy",
      ingredients: [
        "1 can (395g) sweet condensed milk",
        "1 tbsp butter",
        "20g cocoa powder 100% or 3 tbsp chocolate powder + 30g 50% dark chocolate bar (chopped) ",
        "1 cup (160g) chocolate sprinkle",
      ],
      cuisine: "Yes",
      dishType: "dessert",
      duration: 30,
      creator: "Some brazilian from 1946",
    };
    //Iteration 02
    try {
      // const dishDb = new Recipe(newRecipe);
      // await dishDb.save();

      // const recipe = await Recipe.findOne({ title: "Brigadeiro" });
      // console.log(recipe.title);

      //Iteration 03
      await Recipe.insertMany(data);
      // const allRecipes = await Recipe.find();
      // allRecipes.forEach((recipe) => console.log(recipe.title));

      //Iteration 04
      // await Recipe.findOneAndUpdate(
      //   { title: "Rigatoni alla Genovese" },
      //   { duration: 100 },
      //   { new: true, useFindAndModify: false }
      // );
      // console.log("Successfully updated!");

      //Iteration 05
      // await Recipe.deleteOne({ title: "Carrot Cake" });
      // console.log("Recipe deleted");

      //Iteration 06
      mongoose.connection.close();
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
