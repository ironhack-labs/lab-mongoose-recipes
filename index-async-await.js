const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

async function updateRecipes() {
  try {

    await mongoose
    .connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    await mongoose.connection.db.dropDatabase();
    console.log('Database dropped!');

    const recipe1 = {
      title: "Test Recipe Async",
      level: "Amateur Chef",
      ingredients: ["1/2 onion sliced"],
      cuisine: "Asian",
      dishType: "main_course",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 10,
      creator: "Test Creator",
    };

    const createdRecipe = await Recipe.create(recipe1);
    console.log(createdRecipe.title);

    const createdRecipes = await Recipe.insertMany(data);
    createdRecipes.forEach((recipe) => console.log(recipe.title));

    const updateRecipeInfo = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );

    const deletedRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });

    console.log(`Successful deleted ${deletedRecipe.deletedCount} recipes `);

    await mongoose.connection.close();
    console.log("connection closed!");
  } catch (err) {
    console.log(err);
  }
}
updateRecipes()
