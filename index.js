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
      title: "Reforcinho",
      level: "Easy Peasy",
      ingredients: ["9 eggs", "15g of cacau 100%", "300g of peanut"],
      cuisine: "Yes",
      dishType: "other",
      duration: 5,
      creator: "pedrão.do.pull",
    };
    try {
      //ITERATION 2
      // const dishToDB = new Recipe(newRecipe);
      // await dishToDB.save();

      // const recipe = await Recipe.findOne({ title: "Reforcinho" });
      // console.log(recipe.title);

      await Recipe.insertMany(data);

      // ITERATION 3
      // const recipesTitle = await Recipe.find({}, { _id: 0, title: 1 });
      // recipesTitle.forEach((recipe) => console.log(recipe.title));

      // ITERATION 4
      // await Recipe.findOneAndUpdate(
      //   { title: "Rigatoni alla Genovese" },
      //   { duration: 100 },
      //   {},
      //   () => console.log("success!")
      // );

      // ITERATION 5
      // await Recipe.findOneAndDelete({ title: "Carrot Cake" }, {}, () =>
      //   console.log("success!")
      // );

      //ITERATION 6
      mongoose.connection.close();
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
