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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    const newRecipe = {
      title: "Cereal",
      level: "Easy Peasy",
      ingredients: ["Cereal", "Milk", "Fruits"],
      cuisine: "American",
      dishType: "breakfast",
      image:
        "https://www.nestle-cereals.com/mt/sites/g/files/qirczx616/f/styles/scale_992/public/stage_visual/images_16_0.jpg?itok=ARJk5PiB",
      duration: 2,
      creator: "Walter Kellogs",
      created: "1926-03-25",
    };

    return Recipe.create(newRecipe);
  })
  .then((recipe) => {
    console.log("Recipe is saved:", recipe.title);

    let recipeArr = data;

    return Recipe.insertMany(recipeArr);
  })

  .then((recipes) => {
    recipes.forEach((elem) => console.log("Recipes are saved:", elem.title));

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })

  .then((updateRecipe) => {
    console.log("Sucess! New duration is:", updateRecipe.duration);

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .then((removedRecipe) => console.log("Succces!:", removedRecipe))

  //No sabemos como comprobar el delete

  //No nos queda del todo claro la logica del then > return

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

async () => {
  const db = await mongoose.connection.close();
};
