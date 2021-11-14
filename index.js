const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
const connectToMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a Mongo");
  } catch (error) {
    console.error("Error:", error);
  }
};
// Iteration 2
// const createRecipe = async () => {
//   try {
//     const deleteAll = await Recipe.deleteMany();
//     const recipe = await Recipe.create({
//       title: "Asian Glazed Chicken Thighs",
//       level: "Amateur Chef",
//       ingredients: [
//         "1/2 cup rice vinegar",
//         "5 tablespoons honey",
//         "1/3 cup soy sauce (such as Silver Swan®)",
//         "1/4 cup Asian (toasted) sesame oil",
//         "3 tablespoons Asian chili garlic sauce",
//         "3 tablespoons minced garlic",
//         "salt to taste",
//         "8 skinless, boneless chicken thighs",
//       ],
//       cuisine: "Asian",
//       dishType: "main_course",
//       image:
//         "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//       duration: 40,
//       creator: "Chef LePapu",
//     });
//     console.log(recipe.title);
//   } catch (err) {
//     console.error("Error connecting to the database", err);
//   }
// };
// createRecipe();

// iteration 3
const createRecipe = async () => {
  try {
    await Recipe.deleteMany();
    const recipe = await Recipe.insertMany(data);
    recipe.forEach((element) => {
      console.log("title:", element.title);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

const update = async () => {
  try {
    const recipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log(`Recipe update: success!"`);
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};
const remove = async () => {
  try {
    await Recipe.deleteOne({ title: `Carrot Cake` });
    console.log("Delete: Success!");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};
const init = async () => {
  await connectToMongo();
  await createRecipe();
  await update();
  await remove();
  mongoose.connection.close();
};

init();
