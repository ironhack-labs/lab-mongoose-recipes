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
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    updateDatabase();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

async function updateDatabase() {
  try {
    const recipeCreated = await Recipe.create({
      title: "Vegetarian Lasanha",
      level: "Amateur Chef",
      ingredients: [
        "fresh pasta",
        "onions",
        "spinach",
        "riccota",
        "bechamel",
        "mozzarella",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      image:
        "https://www.celeiro.pt/media/contentmanager/content/cache/720x473/receitas/lasanha-de-espinafres.jpg",
      duration: 15,
      creator: "Tiago Páscoa",
    });
    console.log(recipeCreated.title);

    await Recipe.insertMany(data);
    await Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Carrot cake deleted successfuly");
  } catch (e) {
    console.log("error occurred", e);
  } finally {
    mongoose.connection.close();
  }
}
