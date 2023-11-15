const mongoose = require("mongoose");

const Recipe = require("./models/Recipe.model");

const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })

  .then(() => {
    Recipe.insertMany(data)
      .then((data) => console.log("inserted", data))
      .catch((err) => console.log(err));
  })
  .then(() => {
    const newRecipe = {
      title: "Rigatoni alla Genovese Hell",
      level: "Easy Peasy",
      ingredients: [
        "2 pounds red onions, sliced salt to taste",
        "2 (16 ounce) boxes uncooked rigatoni",
        "1 tablespoon chopped fresh marjoram leaves",
        "1 pinch cayenne pepper",
        "2 tablespoons freshly grated Parmigiano-Reggiano cheese",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 220,
      create: "Chef Luigi",
    };
    return Recipe.create(newRecipe);
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => mongoose.connection.close());
